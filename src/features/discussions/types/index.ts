import type { BaseEntity } from '@/types'

export type Discussion = {
  title: string
  body: string
  team_id: string
} & BaseEntity
