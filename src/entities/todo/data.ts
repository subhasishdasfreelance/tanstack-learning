import { createTodoFn, getAllTodosFn } from '#/entities/todo/server'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const keys = {
  all: ['todos'] as const,
}

export const todoQueries = {
  list: () => ({
    queryKey: keys.all,
    queryFn: () => getAllTodosFn(),
  }),
}

export const todoMutations = {
  create: () => ({
    mutationFn: createTodoFn,
  }),
}

export const useTodos = () => {
  return useQuery(todoQueries.list())
}

export const useCreateTodo = () => {
  const qc = useQueryClient()

  return useMutation({
    ...todoMutations.create(),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: keys.all,
      })
    },
  })
}
