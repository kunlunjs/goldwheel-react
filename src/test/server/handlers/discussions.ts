import { rest } from 'msw'
import { nanoid } from 'nanoid'
import { API_BASE } from '@/config'
import { db, persistDb } from '../db'
import { requireAuth, requireAdmin, delayedResponse } from '../utils'

type DiscussionBody = {
  title: string
  body: string
}

export const discussionsHandlers = [
  rest.get(`${API_BASE}/discussions`, (req, res, ctx) => {
    try {
      const user = requireAuth(req)
      const result = db.discussion.findMany({
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

  rest.get(`${API_BASE}/discussions/:discussionId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req)
      const { discussionId } = req.params
      const result = db.discussion.findFirst({
        where: {
          id: {
            equals: discussionId as string
          },
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

  rest.post<DiscussionBody>(`${API_BASE}/discussions`, (req, res, ctx) => {
    try {
      const user = requireAuth(req)
      const data = req.body
      requireAdmin(user)
      const result = db.discussion.create({
        team_id: user.team_id,
        id: nanoid(),
        created_at: Date.now(),
        ...data
      })
      persistDb('discussion')
      return delayedResponse(ctx.json(result))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  }),

  rest.patch<DiscussionBody>(
    `${API_BASE}/discussions/:discussionId`,
    (req, res, ctx) => {
      try {
        const user = requireAuth(req)
        const data = req.body
        const { discussionId } = req.params
        requireAdmin(user)
        const result = db.discussion.update({
          where: {
            team_id: {
              equals: user.team_id
            },
            id: {
              equals: discussionId as string
            }
          },
          data
        })
        persistDb('discussion')
        return delayedResponse(ctx.json(result))
      } catch (error: any) {
        return delayedResponse(
          ctx.status(400),
          ctx.json({ message: error?.message || 'Server Error' })
        )
      }
    }
  ),

  rest.delete(`${API_BASE}/discussions/:discussionId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req)
      const { discussionId } = req.params
      requireAdmin(user)
      const result = db.discussion.delete({
        where: {
          id: {
            equals: discussionId as string
          }
        }
      })
      persistDb('discussion')
      return delayedResponse(ctx.json(result))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  })
]
