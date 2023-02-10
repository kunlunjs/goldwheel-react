import { useParams } from 'react-router-dom'
import { Spinner, MDPreview } from '@/components/Elements'
import { Head } from '@/components/Head'
import { ContentLayout } from '@/components/Layout'
import { Comments } from '@/features/comments'
import { formatDate } from '@/utils/format'
import { useDiscussion } from '../api/getDiscussion'
import { UpdateDiscussion } from '../components/UpdateDiscussion'

export const Discussion = () => {
  const { discussionId } = useParams()
  const discussionQuery = useDiscussion({
    discussionId: discussionId as string
  })

  if (!discussionId) return null

  if (discussionQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!discussionQuery.data) return null

  return (
    <>
      {/* @ts-ignore */}
      <Head title={discussionQuery.data.title} />
      {/* @ts-ignore */}
      <ContentLayout title={discussionQuery.data.title}>
        <span className="text-xs font-bold">
          {/* @ts-ignore */}
          {formatDate(discussionQuery.data.created_at)}
        </span>
        <div className="mt-6 flex flex-col space-y-16">
          <div className="flex justify-end">
            <UpdateDiscussion discussionId={discussionId} />
          </div>
          <div>
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <div className="mt-1 max-w-2xl text-sm text-gray-500">
                  {/* @ts-ignore */}
                  <MDPreview value={discussionQuery.data.body} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <Comments discussionId={discussionId} />
          </div>
        </div>
      </ContentLayout>
    </>
  )
}
