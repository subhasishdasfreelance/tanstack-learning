import type { MutationFunctionContext, QueryKey } from '@tanstack/react-query'

type RollbackCtx<T> = {
  previous?: T
}

export const createRollbackOnError =
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

export const createInvalidateOnSettled =
  (queryKey: QueryKey) =>
  (
    _data: unknown,
    _err: unknown,
    _vars: unknown,
    _ctx: unknown,
    context: MutationFunctionContext,
  ) => {
    context.client.invalidateQueries({ queryKey, exact: true })
  }

export const mutateWrapper = <
  TVars extends { data: any },
  TData,
  TError,
>(mutation: {
  mutate: (
    vars: TVars,
    opts?: {
      onSuccess?: (data: TData) => void
      onError?: (error: TError) => void
    },
  ) => void
}) => {
  return (
    input: TVars['data'],
    opts?: Parameters<typeof mutation.mutate>[1] & Partial<Omit<TVars, 'data'>>,
  ) => {
    const { onSuccess, onError, ...rest } = opts || {}

    mutation.mutate(
      {
        data: input,
        ...(rest as Omit<TVars, 'data'>),
      } as TVars,
      {
        onSuccess,
        onError,
      },
    )
  }
}

export const mutateWrapperAsync = <
  TVars extends { data: any },
  TData,
  TError,
>(mutation: {
  mutate: (
    vars: TVars,
    opts?: {
      onSuccess?: (data: TData) => void
      onError?: (error: TError) => void
    },
  ) => void
}) => {
  return (
    input: TVars['data'],
    opts?: Parameters<typeof mutation.mutate>[1] & Partial<Omit<TVars, 'data'>>,
  ) => {
    const { onSuccess, onError, ...rest } = opts || {}

    mutation.mutate(
      {
        data: input,
        ...(rest as Omit<TVars, 'data'>),
      } as TVars,
      {
        onSuccess,
        onError,
      },
    )
  }
}

export const onMutate =
  <T>(queryKey: QueryKey) =>
  async (_vars: unknown, context: MutationFunctionContext) => {
    const qc = context.client

    await qc.cancelQueries({ queryKey })

    const previous = qc.getQueryData<T>(queryKey)

    return { previous }
  }
