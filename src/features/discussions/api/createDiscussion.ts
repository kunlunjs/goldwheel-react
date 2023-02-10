import { useMutation } from '@tanstack/react-query'

import { axios } from '@/lib/axios'
import type { MutationConfig } from '@/lib/react-query'
import { queryClient } from '@/lib/react-query'
import { useNotificationStore } from '@/stores/notifications'

import type { Discussion } from '../types'

export type CreateDiscussionDTO = {
  data: {
    title: string
    body: string
  }
}

export const createDiscussion = ({
  data
}: CreateDiscussionDTO): Promise<Discussion> => {
  return axios.post(`/discussions`, data)
}

type UseCreateDiscussionOptions = {
  config?: MutationConfig<typeof createDiscussion>
}

export const useCreateDiscussion = ({
  config
}: UseCreateDiscussionOptions = {}) => {
  const { addNotification } = useNotificationStore()
  return useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['discussions'] })
      addNotification({
        type: 'success',
        title: 'Discussion Created'
      })
    },
    ...config,
    // @ts-ignore
    mutationFn: createDiscussion
  })
}
