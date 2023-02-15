import type { BaseEntity } from '@/types'

export type User = {
  bio: string
  email: string
  first_name: string
  last_name: string
  team_id: string
  role: 'ADMIN' | 'USER'
} & BaseEntity
