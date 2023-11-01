import { HttpResponse, delay, http } from 'msw'
import { nanoid } from 'nanoid'
import { API_BASE } from '@/config'
import { db, persistDb } from '../db'
import { requireAuth } from '../utils'

type CreateCommentBody = {
  body: string
  discussion_id: string
}

export const commentsHandlers = [
  http.get(`${API_BASE}/comments`, async ({ request }) => {
    try {
      requireAuth(request)
      const url = new URL(request.url)
      const discussionId = url.searchParams.get('discussionId') || ''
      const result = db.comment.findMany({
        where: {
          discussion_id: {
            equals: discussionId
          }
        }
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
  }),

  http.post<any, CreateCommentBody>(
    `${API_BASE}/comments`,
    async ({ request }) => {
      try {
        const user = requireAuth(request)
        const data = await request.json()
        const result = db.comment.create({
          author_id: user.id,
          id: nanoid(),
          created_at: Date.now(),
          ...data
        })
        persistDb('comment')
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

  http.delete(
    `${API_BASE}/comments/:commentId`,
    async ({ request, params }) => {
      try {
        const user = requireAuth(request)
        const { commentId } = params
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
  )
]
