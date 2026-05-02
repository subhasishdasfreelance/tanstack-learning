import type { UseQueryOptions } from "@tanstack/react-query";

export type SafeOptions<T> = Omit<
  UseQueryOptions<T>,
  'queryKey' | 'queryFn'
>