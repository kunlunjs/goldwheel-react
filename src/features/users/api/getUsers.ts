import { useQuery } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query'

import type { User } from '../types'

export const getUsers = (): Promise<User[]> => {
  return axios.get(`/users`)
}

type QueryFnType = typeof getUsers

type UseUsersOptions = {
  config?: QueryConfig<QueryFnType>
}

export const useUsers = ({ config }: UseUsersOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    // @ts-ignore
    queryKey: ['users'],
    queryFn: () => getUsers()
  })
}
