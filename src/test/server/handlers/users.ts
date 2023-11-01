import { HttpResponse, delay, http } from 'msw'
import { API_BASE } from '@/config'
import { db, persistDb } from '../db'
import { requireAuth, requireAdmin } from '../utils'

type ProfileBody = {
  email: string
  bio: string
  first_name: string
  last_name: string
}

export const usersHandlers = [
  http.get(`${API_BASE}/users`, async ({ request }) => {
    try {
      const user = requireAuth(request)
      const result = db.user.findMany({
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

  http.patch<any, ProfileBody>(
    `${API_BASE}/users/profile`,
    async ({ request }) => {
      try {
        const user = requireAuth(request)
        const data = await request.json()
        const result = db.user.update({
          where: {
            id: {
              equals: user.id
            }
          },
          data
        })
        persistDb('user')
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

  http.delete(`${API_BASE}/users/:userId`, async ({ request, params }) => {
    try {
      const user = requireAuth(request)
      const { userId } = params
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
  })
]
