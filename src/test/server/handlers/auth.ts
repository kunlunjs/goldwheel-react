import { rest } from 'msw'
import { nanoid } from 'nanoid'
import { API_URL } from '@/config'
import { db, persistDb } from '../db'
import { authenticate, delayedResponse, hash, requireAuth } from '../utils'

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
  rest.post<RegisterBody>(`${API_URL}/auth/register`, (req, res, ctx) => {
    try {
      const userObject = req.body

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

      return delayedResponse(ctx.json(result))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  }),

  rest.post<LoginBody>(`${API_URL}/auth/login`, (req, res, ctx) => {
    try {
      const credentials = req.body
      const result = authenticate(credentials)
      return delayedResponse(ctx.json(result))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  }),

  rest.get(`${API_URL}/auth/me`, (req, res, ctx) => {
    try {
      const user = requireAuth(req)

      return delayedResponse(ctx.json(user))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  })
]
