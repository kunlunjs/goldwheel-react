import type { BaseEntity } from '@/types'

export type Comment = {
  body: string
  author_id: string
  discussion_id: string
} & BaseEntity
