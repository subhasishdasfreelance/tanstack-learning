import type { UseQueryOptions } from '@tanstack/react-query'

export type SafeOptions<TData> = Omit<
  UseQueryOptions<TData, unknown, TData, any>,
  'queryKey' | 'queryFn'
>
