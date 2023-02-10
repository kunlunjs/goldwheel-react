import type { ReactNode } from 'react'
import { useCallback } from 'react'
import type { Comment } from '@/features/comments'
import type { User } from '@/features/users'

import { useUser } from './auth'

export enum ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

type RoleTypes = keyof typeof ROLES

export const POLICIES = {
  'comment:delete': (user: User, comment: Comment) => {
    if (user.role === 'ADMIN') {
      return true
    }

    if (user.role === 'USER' && comment.author_id === user.id) {
      return true
    }

    return false
  }
}

export const useAuthorization = () => {
  const user = useUser()

  if (!user.data) {
    throw Error('User does not exist!')
  }

  const checkAccess = useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (!user.data) return false

      if (allowedRoles && allowedRoles.length > 0) {
        return allowedRoles?.includes(user.data.role)
      }

      return true
    },
    [user.data]
  )

  return { checkAccess, role: user.data.role }
}

type AuthorizationProps = {
  forbiddenFallback?: ReactNode
  children: ReactNode
} & (
  | {
      allowedRoles: RoleTypes[]
      policyCheck?: never
    }
  | {
      allowedRoles?: never
      policyCheck: boolean
    }
)

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization()

  let canAccess = false

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles })
  }

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck
  }

  return <>{canAccess ? children : forbiddenFallback}</>
}
