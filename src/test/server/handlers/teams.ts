import { rest } from 'msw'
import { API_BASE } from '@/config'
import { db } from '../db'
import { delayedResponse } from '../utils'

export const teamsHandlers = [
  rest.get(`${API_BASE}/teams`, (req, res, ctx) => {
    try {
      const result = db.team.getAll()
      return delayedResponse(ctx.json(result))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  })
]
