import { Table, Spinner, Link } from '@/components/Elements'
import { formatDate } from '@/utils/format'
import { useDiscussions } from '../api/getDiscussions'
import type { Discussion } from '../types'

import { DeleteDiscussion } from './DeleteDiscussion'

export const DiscussionsList = () => {
  const discussionsQuery = useDiscussions()

  if (discussionsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!discussionsQuery.data) return null

  return (
    <Table<Discussion>
      // @ts-ignore
      data={discussionsQuery.data}
      columns={[
        {
          title: 'Title',
          field: 'title'
        },
        {
          title: 'Created At',
          field: 'created_at',
          Cell({ entry: { created_at } }) {
            return <span>{formatDate(created_at)}</span>
          }
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <Link to={`./${id}`}>View</Link>
          }
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <DeleteDiscussion id={id} />
          }
        }
      ]}
    />
  )
}
