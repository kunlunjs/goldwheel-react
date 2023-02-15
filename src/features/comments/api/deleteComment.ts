import { useMutation } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import type { MutationConfig } from '@/lib/react-query'
import { queryClient } from '@/lib/react-query'
import { useNotificationStore } from '@/stores/notifications'

export const deleteComment = ({ commentId }: { commentId: string }) => {
  return axios.delete(`/comments/${commentId}`)
}

type UseDeleteCommentOptions = {
  discussionId: string
  config?: MutationConfig<typeof deleteComment>
}

export const useDeleteComment = ({
  config,
  discussionId
}: UseDeleteCommentOptions) => {
  const { addNotification } = useNotificationStore()
  return useMutation({
    ...config,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', discussionId])
      addNotification({
        type: 'success',
        title: 'Comment Deleted'
      })
    },
    mutationFn: deleteComment
  })
}
