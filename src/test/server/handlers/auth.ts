import { HttpResponse, delay, http } from 'msw'
import { nanoid } from 'nanoid'
import { API_BASE } from '@/config'
import { db, persistDb } from '../db'
import { authenticate, hash, requireAuth } from '../utils'

type RegisterBody = {
  first_name: string
  last_name: string
  email: string
  password: string
  team_id?: string
  team_name?: string
}

type LoginBody = {
  email: string
  password: string
}

export const authHandlers = [
  http.post<any, RegisterBody>(
    `${API_BASE}/auth/register`,
    async ({ request }) => {
      try {
        const userObject = await request.json()

        const existingUser = db.user.findFirst({
          where: {
            email: {
              equals: userObject.email
            }
          }
        })

        if (existingUser) {
          throw new Error('The user already exists')
        }

        let teamId
        let role

        if (!userObject.team_id) {
          const team = db.team.create({
            id: nanoid(),
            name: userObject.team_name ?? `${userObject.first_name} Team`,
            created_at: Date.now()
          })
          persistDb('team')
          teamId = team.id
          role = 'ADMIN'
        } else {
          const existingTeam = db.team.findFirst({
            where: {
              id: {
                equals: userObject.team_id
              }
            }
          })

          if (!existingTeam) {
            throw new Error('The team you are trying to join does not exist!')
          }
          teamId = userObject.team_id
          role = 'USER'
        }

        db.user.create({
          ...userObject,
          id: nanoid(),
          created_at: Date.now(),
          role,
          password: hash(userObject.password),
          team_id: teamId
        })

        persistDb('user')

        const result = authenticate({
          email: userObject.email,
          password: userObject.password
        })

        await delay(1000)
        return HttpResponse.json(result)
      } catch (error: any) {
        await delay(400)
        return new Response(
          JSON.stringify({ message: error?.message || 'Server Error' }),
          {
            status: 400
          }
        )
      }
    }
  ),

  http.post<any, LoginBody>(`${API_BASE}/auth/login`, async ({ request }) => {
    try {
      const credentials = await request.json()
      const result = authenticate(credentials)
      await delay(1000)
      return HttpResponse.json(result)
    } catch (error: any) {
      await delay(400)
      return new Response(
        JSON.stringify({ message: error?.message || 'Server Error' }),
        {
          status: 400
        }
      )
    }
  }),

  http.get(`${API_BASE}/auth/me`, async ({ request }) => {
    try {
      const user = requireAuth(request)

      await delay(1000)
      return HttpResponse.json(user)
    } catch (error: any) {
      await delay(400)
      return new Response(
        JSON.stringify({ message: error?.message || 'Server Error' }),
        {
          status: 400
        }
      )
    }
  })
]
