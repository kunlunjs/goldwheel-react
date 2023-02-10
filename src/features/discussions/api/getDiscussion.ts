import { useQuery } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query'

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
  config?: QueryConfig<QueryFnType>
}

export const useDiscussion = ({
  discussionId,
  config
}: UseDiscussionOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    // @ts-ignore
    queryKey: ['discussion', discussionId],
    queryFn: () => getDiscussion({ discussionId })
  })
}
