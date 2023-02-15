import { useQuery } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query'
import type { Team } from '../types'

export const getTeams = (): Promise<Team[]> => {
  return axios.get('/teams')
}

type QueryFnType = typeof getTeams

type UseTeamsOptions = {
  config?: QueryConfig<QueryFnType>
}

export const useTeams = ({ config }: UseTeamsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['teams'],
    queryFn: () => getTeams()
  })
}
