import { useMutation } from '@tanstack/react-query'
import type {
  MutationFunctionContext,
  QueryClient,
  QueryKey,
  UseMutationOptions,
} from '@tanstack/react-query'

export function handler<TData = unknown, TResult = unknown>(
  fn: (ctx: {
    data?: TData
    error?: unknown
    result?: TResult
    client: QueryClient
  }) => void,
) {
  return (...args: unknown[]) => {
    let data, error, result, context

    if (args.length === 5) {
      ;[data, error, , result, context] = args
    } else {
      ;[data, , result, context] = args
    }

    fn({
      data: data as TData,
      error,
      result: result as TResult,
      client: (context as MutationFunctionContext).client,
    })
  }
}

export function pipe<T>(...fns: ((x: T) => void)[]) {
  return (x: T) => {
    for (const fn of fns) fn(x)
  }
}

export const invalidateQueries = (queryKey: QueryKey) =>
  handler(({ client }) => {
    client.invalidateQueries({ queryKey })
  })

export const rollbackToPrevious = <T>(queryKey: QueryKey) =>
  handler<unknown, { previous?: T }>(({ result, client }) => {
    if (result?.previous) {
      client.setQueryData(queryKey, result.previous)
    }
  })

export const swapTempId = <T extends { id: string }>(queryKey: QueryKey) =>
  handler<T>(({ data, client }) => {
    if (!data) return

    client.setQueryData(queryKey, (old: T[] = []) =>
      old.map((t) => (t.id.startsWith('temp-') ? data : t)),
    )
  })

export const onMutate =
  <T>(queryKey: QueryKey) =>
  async (_vars: unknown, context: MutationFunctionContext) => {
    const qc = context.client

    await qc.cancelQueries({ queryKey })

    const previous = qc.getQueryData<T>(queryKey)

    return { previous }
  }

type VarsWithData<T> = { data: T }

export function useAppMutation<
  TData,
  TError = unknown,
  TInput = unknown,
  TContext = unknown,
>(options: UseMutationOptions<TData, TError, VarsWithData<TInput>, TContext>) {
  const mutation = useMutation(options)

  const mutate = (
    input: TInput,
    opts?: {
      onSuccess?: (data: TData) => void
      onError?: (err: TError) => void
    },
  ) => {
    mutation.mutate(
      { data: input },
      {
        onSuccess: (data) => {
          opts?.onSuccess?.(data)
        },
        onError: (err) => {
          opts?.onError?.(err)
        },
      },
    )
  }

  const mutateAsync = async (
    input: TInput,
    opts?: {
      onSuccess?: (data: TData) => void
      onError?: (err: TError) => void
    },
  ) => {
    try {
      const res = await mutation.mutateAsync({ data: input })
      opts?.onSuccess?.(res)
      return res
    } catch (err) {
      opts?.onError?.(err as TError)
      throw err
    }
  }

  return {
    ...mutation,
    mutate,
    mutateAsync,
  }
}
