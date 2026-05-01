import { getAllTodosFn } from '#/entities/todo/fns'
import { keys } from '#/entities/todo/keys'
import { queryOptions } from '@tanstack/react-query'

export const todoQueries = {
  list: () =>
    queryOptions({
      queryKey: keys.list(),
      queryFn: getAllTodosFn,
    }),
}
