import { useMutation } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import type { MutationConfig } from '@/lib/react-query'
import { queryClient } from '@/lib/react-query'
import { useNotificationStore } from '@/stores/notifications'

import type { Discussion } from '../types'

export type UpdateDiscussionDTO = {
  data: {
    title: string
    body: string
  }
  discussionId: string
}

export const updateDiscussion = ({
  data,
  discussionId
}: UpdateDiscussionDTO): Promise<Discussion> => {
  return axios.patch(`/discussions/${discussionId}`, data)
}

type UseUpdateDiscussionOptions = {
  config?: MutationConfig<typeof updateDiscussion>
}

export const useUpdateDiscussion = ({
  config
}: UseUpdateDiscussionOptions = {}) => {
  const { addNotification } = useNotificationStore()

  return useMutation({
    ...config,
    onSuccess: data => {
      queryClient.refetchQueries({ queryKey: ['discussion', data.id] })
      addNotification({
        type: 'success',
        title: 'Discussion Updated'
      })
    },
    mutationFn: updateDiscussion
  })
}
