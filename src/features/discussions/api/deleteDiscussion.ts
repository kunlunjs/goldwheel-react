import { useMutation } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import type { MutationConfig } from '@/lib/react-query'
import { queryClient } from '@/lib/react-query'
import { useNotificationStore } from '@/stores/notifications'

export const deleteDiscussion = ({
  discussionId
}: {
  discussionId: string
}) => {
  return axios.delete(`/discussions/${discussionId}`)
}

type UseDeleteDiscussionOptions = {
  config?: MutationConfig<typeof deleteDiscussion>
}

export const useDeleteDiscussion = ({
  config
}: UseDeleteDiscussionOptions = {}) => {
  const { addNotification } = useNotificationStore()

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discussions'] })
      addNotification({
        type: 'success',
        title: 'Discussion Deleted'
      })
    },
    ...config,
    // @ts-ignore
    mutationFn: deleteDiscussion
  })
}
