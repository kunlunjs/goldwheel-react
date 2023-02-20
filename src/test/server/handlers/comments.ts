import { rest } from 'msw'
import { nanoid } from 'nanoid'
import { API_BASE } from '@/config'
import { db, persistDb } from '../db'
import { requireAuth, delayedResponse } from '../utils'

type CreateCommentBody = {
  body: string
  discussion_id: string
}

export const commentsHandlers = [
  rest.get(`${API_BASE}/comments`, (req, res, ctx) => {
    try {
      requireAuth(req)
      const discussionId = req.url.searchParams.get('discussionId') || ''
      const result = db.comment.findMany({
        where: {
          discussion_id: {
            equals: discussionId
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

  rest.post<CreateCommentBody>(`${API_BASE}/comments`, (req, res, ctx) => {
    try {
      const user = requireAuth(req)
      const data = req.body
      const result = db.comment.create({
        author_id: user.id,
        id: nanoid(),
        created_at: Date.now(),
        ...data
      })
      persistDb('comment')
      return delayedResponse(ctx.json(result))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  }),

  rest.delete(`${API_BASE}/comments/:commentId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req)
      const { commentId } = req.params
      const result = db.comment.delete({
        where: {
          id: {
            equals: commentId as string
          },
          ...(user.role === 'USER' && {
            author_id: {
              equals: user.id
            }
          })
        }
      })
      persistDb('comment')
      return delayedResponse(ctx.json(result))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  })
]
