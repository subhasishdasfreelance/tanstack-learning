import { todoMutations } from '#/entities/todo/mutations'
import { todoQueries } from '#/entities/todo/queries'
import { useAppMutation } from '#/shared/lib/mutation.helper'
import { useQuery } from '@tanstack/react-query'

export const useTodos = () => {
  return useQuery(todoQueries.list())
  // const { data } = useQuery(todoQueries.listByStatus({ status: true }, {staleTime: 500}))
}

export const useCreateTodo = () => {
  return useAppMutation(todoMutations.create())
}
export const useToggleTodo = () => {
  return useAppMutation(todoMutations.toggle())
}
export const useUpdateTodoText = () => {
  return useAppMutation(todoMutations.updateText())
}
export const useDeleteTodo = () => {
  return useAppMutation(todoMutations.delete())
}
