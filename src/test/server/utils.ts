import type { DefaultBodyType, StrictRequest } from 'msw'
import { db } from './db'

const isTesting =
  import.meta.env.NODE_ENV === 'test' || ((window as any).Cypress as any)

export const encode = (obj: any) => {
  const token = window.btoa(encodeURIComponent(JSON.stringify(obj)))
  return token
}

export const decode = (str: string) => {
  const decode_token = JSON.parse(decodeURIComponent(window.atob(str)))
  return decode_token
}

export const hash = (str: string) => {
  let hash = 5381,
    i = str.length

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return String(hash >>> 0)
}

const omit = <T extends object>(obj: T, keys: string[]): T => {
  const result = {} as T
  for (const key in obj) {
    if (!keys.includes(key)) {
      result[key] = obj[key]
    }
  }

  return result
}

export const sanitizeUser = <O extends object>(user: O) =>
  omit<O>(user, ['password', 'iat'])

export function authenticate({
  email,
  password
}: {
  email: string
  password: string
}) {
  const user = db.user.findFirst({
    where: {
      email: {
        equals: email
      }
    }
  })

  if (user?.password === hash(password)) {
    const sanitizedUser = sanitizeUser(user)
    const encodedToken = encode(sanitizedUser)
    return { user: sanitizedUser, jwt: encodedToken }
  }

  const error = new Error('Invalid username or password')
  throw error
}

export function requireAuth(request: StrictRequest<DefaultBodyType>) {
  try {
    // Bearer {token}
    const encodedToken = request.headers.get('Authorization')?.split(' ')[1]
    if (!encodedToken) {
      throw new Error('No authorization token provided!')
    }
    const decodedToken = decode(encodedToken) as { id: string }

    const user = db.user.findFirst({
      where: {
        id: {
          equals: decodedToken.id
        }
      }
    })

    if (!user) {
      throw Error('Unauthorized')
    }

    return sanitizeUser(user)
  } catch (err: any) {
    throw new Error(err)
  }
}

export function requireAdmin(user: any) {
  if (user.role !== 'ADMIN') {
    throw Error('Unauthorized')
  }
}
