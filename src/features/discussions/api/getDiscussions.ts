import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { axios } from '@/lib/axios'
import type { Discussion } from '../types'

export const getDiscussions = (): Promise<Discussion[]> => {
  return axios.get('/discussions')
}

type QueryFnType = typeof getDiscussions

type UseDiscussionsOptions = {
  config?: Partial<Parameters<typeof useQuery>[0]> // QueryConfig<QueryFnType>
}

export const useDiscussions = ({ config }: UseDiscussionsOptions = {}) => {
  return useQuery<Discussion[], AxiosError>({
    // ExtractFnReturnType<QueryFnType>
    ...config,
    queryKey: ['discussions'],
    queryFn: () => getDiscussions()
  })
}
