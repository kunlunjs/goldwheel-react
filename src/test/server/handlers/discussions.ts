import { HttpResponse, delay, http } from 'msw'
import { nanoid } from 'nanoid'
import { API_BASE } from '@/config'
import { db, persistDb } from '../db'
import { requireAuth, requireAdmin } from '../utils'

type DiscussionBody = {
  title: string
  body: string
}

export const discussionsHandlers = [
  http.get(`${API_BASE}/discussions`, async ({ request }) => {
    try {
      const user = requireAuth(request)
      const result = db.discussion.findMany({
        where: {
          team_id: {
            equals: user.team_id
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

  http.get(
    `${API_BASE}/discussions/:discussionId`,
    async ({ request, params }) => {
      try {
        const user = requireAuth(request)
        const { discussionId } = params
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

  http.post<any, DiscussionBody>(
    `${API_BASE}/discussions`,
    async ({ request }) => {
      try {
        const user = requireAuth(request)
        const data = await request.json()
        requireAdmin(user)
        const result = db.discussion.create({
          team_id: user.team_id,
          id: nanoid(),
          created_at: Date.now(),
          ...data
        })
        persistDb('discussion')
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

  http.patch<{ discussionId: string }, DiscussionBody>(
    `${API_BASE}/discussions/:discussionId`,
    async ({ request, params }) => {
      try {
        const user = requireAuth(request)
        const data = await request.json()
        const { discussionId } = params
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
    `${API_BASE}/discussions/:discussionId`,
    async ({ request, params }) => {
      try {
        const user = requireAuth(request)
        const { discussionId } = params
        requireAdmin(user)
        const result = db.discussion.delete({
          where: {
            id: {
              equals: discussionId as string
            }
          }
        })
        persistDb('discussion')
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
