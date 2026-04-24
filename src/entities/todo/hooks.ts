import { keys } from "#/entities/todo/keys"
import { todoMutations } from "#/entities/todo/mutations"
import { todoQueries } from "#/entities/todo/queries"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useTodos = () => {
  return useQuery(todoQueries.list())
}

export const useCreateTodo = () => {
  const qc = useQueryClient()

  return useMutation({
    ...todoMutations.create(),

    // ---- Optimistic Update ----
    onMutate: async (newTodo) => {
      await qc.cancelQueries({ queryKey: keys.all })

      const previousTodos = qc.getQueryData(keys.all)

      qc.setQueryData(keys.all, (old: any[] = []) => [
        ...old,
        {
          ...newTodo,
          id: 'temp-id', // temporary placeholder
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
}
