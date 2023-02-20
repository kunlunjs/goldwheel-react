import { rest } from 'msw'
import { API_BASE } from '@/config'
import { db, persistDb } from '../db'
import { requireAuth, requireAdmin, delayedResponse } from '../utils'

type ProfileBody = {
  email: string
  bio: string
  first_name: string
  last_name: string
}

export const usersHandlers = [
  rest.get(`${API_BASE}/users`, (req, res, ctx) => {
    try {
      const user = requireAuth(req)
      const result = db.user.findMany({
        where: {
          team_id: {
            equals: user.team_id
          }
        }
      })

      return delayedResponse(ctx.json(result))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  }),

  rest.patch<ProfileBody>(`${API_BASE}/users/profile`, (req, res, ctx) => {
    try {
      const user = requireAuth(req)
      const data = req.body
      const result = db.user.update({
        where: {
          id: {
            equals: user.id
          }
        },
        data
      })
      persistDb('user')
      return delayedResponse(ctx.json(result))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  }),

  rest.delete(`${API_BASE}/users/:userId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req)
      const { userId } = req.params
      requireAdmin(user)
      const result = db.user.delete({
        where: {
          id: {
            equals: userId as string
          },
          team_id: {
            equals: user.team_id
          }
        }
      })
      persistDb('user')
      return delayedResponse(ctx.json(result))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  })
]
