import { useQuery } from '@tanstack/react-query'

import type { AxiosError } from 'axios'
import { axios } from '@/lib/axios'
import type { Comment } from '../types'

export const getComments = ({
  discussionId
}: {
  discussionId: string
}): Promise<Comment[]> => {
  return axios.get(`/comments`, {
    params: {
      discussionId
    }
  })
}

type QueryFnType = typeof getComments

type UseCommentsOptions = {
  discussionId: string
  config?: Partial<Parameters<typeof useQuery>[0]> // QueryConfig<QueryFnType>
}

export const useComments = ({ discussionId, config }: UseCommentsOptions) => {
  return useQuery<Comment[], AxiosError>({
    // ExtractFnReturnType<QueryFnType>
    ...config,
    queryKey: ['comments', discussionId],
    queryFn: () => getComments({ discussionId })
  })
}
