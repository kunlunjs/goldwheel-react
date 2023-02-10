import { useMutation } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import type { MutationConfig } from '@/lib/react-query'
import { queryClient } from '@/lib/react-query'
import { useNotificationStore } from '@/stores/notifications'
import type { Comment } from '../types'

export type CreateCommentDTO = {
  data: {
    body: string
    discussion_id: string
  }
}

export const createComment = ({ data }: CreateCommentDTO): Promise<Comment> => {
  return axios.post('/comments', data)
}

type UseCreateCommentOptions = {
  discussionId: string
  config?: MutationConfig<typeof createComment>
}

export const useCreateComment = ({
  config,
  discussionId
}: UseCreateCommentOptions) => {
  const { addNotification } = useNotificationStore()

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', discussionId] })
      addNotification({
        type: 'success',
        title: 'Comment Created'
      })
    },
    ...config,
    // @ts-ignore
    mutationFn: createComment
  })
}
