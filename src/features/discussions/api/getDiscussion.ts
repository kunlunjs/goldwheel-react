import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { axios } from '@/lib/axios'

import type { Discussion } from '../types'

export const getDiscussion = ({
  discussionId
}: {
  discussionId: string
}): Promise<Discussion> => {
  return axios.get(`/discussions/${discussionId}`)
}

type QueryFnType = typeof getDiscussion

type UseDiscussionOptions = {
  discussionId: string
  config?: Partial<Parameters<typeof useQuery>[0]> // QueryConfig<QueryFnType>
}

export const useDiscussion = ({
  discussionId,
  config
}: UseDiscussionOptions) => {
  return useQuery<Discussion, AxiosError>({
    // ExtractFnReturnType<QueryFnType>
    ...config,
    queryKey: ['discussion', discussionId],
    queryFn: () => getDiscussion({ discussionId })
  })
}
