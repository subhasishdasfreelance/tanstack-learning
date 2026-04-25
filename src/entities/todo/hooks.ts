import { keys } from '#/entities/todo/keys'
import { todoMutations } from '#/entities/todo/mutations'
import { todoQueries } from '#/entities/todo/queries'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { nanoid } from 'nanoid'

export const useTodos = () => {
  return useQuery(todoQueries.list())
}

type CreateTodoInput = {
  text: string
}

export const useCreateTodo = () => {
  const qc = useQueryClient()

  const mutation = useMutation({
    ...todoMutations.create(),

    // ---- Optimistic Update ----
    onMutate: async (vars) => {
      const newTodo = vars.data
      await qc.cancelQueries({ queryKey: keys.all })

      const previousTodos = qc.getQueryData(keys.all)

      qc.setQueryData(keys.all, (old: any[] = []) => [
        ...old,
        {
          ...newTodo,
          id: nanoid(), // temporary placeholder
        },
      ])

      return { previousTodos }
    },

    // ---- Rollback on error ----
    onError: (_err, _vars, context) => {
      if (context?.previousTodos) {
        qc.setQueryData(keys.all, context.previousTodos)
      }
    },

    // ---- Always refetch to sync with server ----
    onSettled: () => {
      qc.invalidateQueries({
        queryKey: keys.all,
        exact: true,
      })
    },
  })

  const mutateTodo = (
    input: CreateTodoInput,
    opts?: Parameters<typeof mutation.mutate>[1] &
      Omit<Parameters<typeof mutation.mutate>[0], 'data'>,
  ) => {
    const { onSuccess, onError, ...rest } = opts || {}

    mutation.mutate(
      {
        data: input,
        ...rest,
      },
      {
        onSuccess,
        onError,
      },
    )
  }

  const mutateTodoAsync = (
    input: CreateTodoInput,
    opts?: Parameters<typeof mutation.mutate>[1] &
      Omit<Parameters<typeof mutation.mutate>[0], 'data'>,
  ) => {
    const { onSuccess, onError, ...rest } = opts || {}

    mutation.mutateAsync(
      {
        data: input,
        ...rest,
      },
      {
        onSuccess,
        onError,
      },
    )
  }

  return {
    ...mutation,
    mutateTodo,
    mutateTodoAsync,
  }
}
