import type {
  UseQueryOptions,
  UseMutationOptions,
  DefaultOptions
} from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { AsyncReturnType } from 'type-fest'

const queryConfig: DefaultOptions = {
  queries: {
    retry: false,
    throwOnError: true,
    refetchOnWindowFocus: false
  }
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })

export type ExtractFnReturnType<FnType extends (...args: any) => any> =
  AsyncReturnType<FnType>

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
