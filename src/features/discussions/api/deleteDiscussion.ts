import { useMutation } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
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
  config?: Partial<Parameters<typeof useMutation>[0]> // MutationConfig<typeof deleteDiscussion>
}

export const useDeleteDiscussion = ({
  config
}: UseDeleteDiscussionOptions = {}) => {
  const { addNotification } = useNotificationStore()

  return useMutation({
    ...config,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discussions'] })
      addNotification({
        type: 'success',
        title: 'Discussion Deleted'
      })
    },
    mutationFn: deleteDiscussion
  })
}
