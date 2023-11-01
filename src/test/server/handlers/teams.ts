import { HttpResponse, delay, http } from 'msw'
import { API_BASE } from '@/config'
import { db } from '../db'

export const teamsHandlers = [
  http.get(`${API_BASE}/teams`, async ({ request }) => {
    try {
      const result = db.team.getAll()
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
