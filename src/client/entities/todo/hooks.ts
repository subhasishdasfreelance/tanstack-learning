import { todoKeys, todosApi } from '#/client/entities/todo/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useTodos = () => {
  return useQuery({ ...todosApi.list() })
  // return useQuery(usersApi.list())
}

export const useCreateTodo = () => {
  const qc = useQueryClient()

  return useMutation({
    ...todosApi.create(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: todoKeys.all })
    },
  })
}
