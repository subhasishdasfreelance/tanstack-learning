import { getErrorMessage } from '#/shared/lib/getErrorMessage'
import type {
  MutationFunctionContext,
  QueryClient,
  QueryKey,
  UseMutationOptions,
} from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

type RollbackCtx<T> = {
  previous?: T
}

export const rollbackToPrevious =
  <T>(queryKey: QueryKey) =>
  (
    _err: unknown,
    _vars: unknown,
    ctx: RollbackCtx<T> | undefined,
    context: MutationFunctionContext,
  ) => {
    if (ctx?.previous) {
      context.client.setQueryData(queryKey, ctx.previous)
    }
  }

export const invalidateQueriesAndSwapTempId =
  <T extends { id: string }>(queryKey: QueryKey) =>
  (
    data: unknown,
    _vars: unknown,
    _ctx: unknown,
    context: MutationFunctionContext,
  ) => {
    context.client.invalidateQueries({ queryKey })
    if (!data) return

    context.client.setQueryData(queryKey, (old: T[] = []) =>
      old.map((t) => (t.id.startsWith('temp-') ? data : t)),
    )
  }

export const invalidateQueries =
  (queryKey: QueryKey) =>
  (
    _data: unknown,
    _vars: unknown,
    _ctx: unknown,
    context: MutationFunctionContext,
  ) => {
    context.client.invalidateQueries({ queryKey })
  }

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

export const invalidateQueries2 = (queryKey: QueryKey) =>
  handler(({ client }) => {
    client.invalidateQueries({ queryKey })
  })

export const rollbackToPrevious2 = <T>(queryKey: QueryKey) =>
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
      onError?: (err: string) => void
    },
  ) => {
    mutation.mutate(
      { data: input },
      {
        onSuccess: (data) => {
          opts?.onSuccess?.(data)
        },
        onError: (err) => {
          const errMsg = getErrorMessage(err)
          opts?.onError?.(errMsg)
        },
      },
    )
  }

  const mutateAsync = async (
    input: TInput,
    opts?: {
      onSuccess?: (data: TData) => void
      onError?: (err: string) => void
    },
  ) => {
    try {
      const res = await mutation.mutateAsync({ data: input })
      opts?.onSuccess?.(res)
      return res
    } catch (err) {
      const errMsg = getErrorMessage(err)
      opts?.onError?.(errMsg)
      throw err
    }
  }

  return {
    ...mutation,
    mutate,
    mutateAsync,
  }
}
