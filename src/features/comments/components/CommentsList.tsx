import { ArchiveBoxIcon } from '@heroicons/react/24/outline'

import { Spinner, MDPreview } from '@/components/Elements'
import type { User } from '@/features/users'
import { useUser } from '@/lib/auth'
import { POLICIES, Authorization } from '@/lib/authorization'
import { formatDate } from '@/utils/format'

import { useComments } from '../api/getComments'

import { DeleteComment } from './DeleteComment'

type CommentsListProps = {
  discussionId: string
}

export const CommentsList = ({ discussionId }: CommentsListProps) => {
  const user = useUser()
  const commentsQuery = useComments({ discussionId })

  if (commentsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  // @ts-ignore
  if (!commentsQuery?.data?.length)
    return (
      <div
        role="list"
        aria-label="comments"
        className="flex h-40 flex-col items-center justify-center bg-white text-gray-500"
      >
        <ArchiveBoxIcon className="h-10 w-10" />
        <h4>No Comments Found</h4>
      </div>
    )

  return (
    <ul aria-label="comments" className="flex flex-col space-y-3">
      {/* @ts-ignore */}
      {commentsQuery.data.map((comment, index) => (
        <li
          aria-label={`comment-${comment.body}-${index}`}
          key={comment.id || index}
          className="w-full bg-white p-4 shadow-sm"
        >
          <Authorization
            policyCheck={POLICIES['comment:delete'](user.data as User, comment)}
          >
            <div className="flex justify-between">
              <span className="text-xs font-semibold">
                {formatDate(comment.created_at)}
              </span>
              <DeleteComment discussionId={discussionId} id={comment.id} />
            </div>
          </Authorization>

          <MDPreview value={comment.body} />
        </li>
      ))}
    </ul>
  )
}
