import type { BaseEntity } from '@/types'

export type User = {
  first_name: string
  last_name: string
  email: string
  role: 'ADMIN' | 'USER'
  team_id: string
  bio: string
} & BaseEntity
