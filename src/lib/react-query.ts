import type {
  UseQueryOptions,
  UseMutationOptions,
  DefaultOptions
} from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

const queryConfig: DefaultOptions = {
  queries: {
    retry: false,
    useErrorBoundary: true,
    refetchOnWindowFocus: false
  }
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })

export type ExtractFnReturnType<FnType extends (...args: any) => any> =
  Awaited<FnType>

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>

export type MutationConfig<MutationFnType extends (...args: any) => any> =
  UseMutationOptions<
    ExtractFnReturnType<MutationFnType>,
    AxiosError,
    Parameters<MutationFnType>[0]
  >
