import { ContentLayout } from '@/components/Layout'
import { CreateDiscussion } from '../components/CreateDiscussion'
import { DiscussionsList } from '../components/DiscussionsList'
// import { DiscussionsList } from '../components/DiscussionsList.antd'

export const DiscussionsPage = () => {
  return (
    <ContentLayout title="Discussions">
      <div className="flex justify-end">
        <CreateDiscussion />
      </div>
      <div className="mt-4">
        <DiscussionsList />
      </div>
    </ContentLayout>
  )
}
