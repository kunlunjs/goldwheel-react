import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { axios } from '@/lib/axios'
import type { Team } from '../types'

export const getTeams = (): Promise<Team[]> => {
  return axios.get('/teams')
}

type QueryFnType = typeof getTeams

type UseTeamsOptions = {
  config?: Partial<Parameters<typeof useQuery>[0]> // QueryConfig<QueryFnType>
}

export const useTeams = ({ config }: UseTeamsOptions = {}) => {
  return useQuery<Team[], AxiosError>({
    // ExtractFnReturnType<QueryFnType>
    ...config,
    queryKey: ['teams'],
    queryFn: () => getTeams()
  })
}
