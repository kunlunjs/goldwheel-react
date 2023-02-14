import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { axios } from '@/lib/axios'
import type { User } from '../types'

export const getUsers = (): Promise<User[]> => {
  return axios.get(`/users`)
}

type QueryFnType = typeof getUsers

type UseUsersOptions = {
  config?: Partial<Parameters<typeof useQuery>[0]> // QueryConfig<QueryFnType>
}

export const useUsers = ({ config }: UseUsersOptions = {}) => {
  return useQuery<User[], AxiosError>({
    // ExtractFnReturnType<QueryFnType>
    ...config,
    queryKey: ['users'],
    queryFn: () => getUsers()
  })
}
