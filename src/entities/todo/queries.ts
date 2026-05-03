import { getAllTodosFn, getTodosByStatusFn } from '#/entities/todo/fns'
import { keys } from '#/entities/todo/keys'
import type { ClientTodo } from '#/entities/todo/schema'
import type { SafeOptions } from '#/shared/lib/query.helper'
import { queryOptions } from '@tanstack/react-query'

export const todoQueries = {
  list: (options?: SafeOptions<ClientTodo[]>) =>
    queryOptions({
      ...options,
      queryKey: keys.list(),
      queryFn: () => getAllTodosFn(),
    }),

  listByStatus: (
    vars: { status: boolean },
    options?: SafeOptions<ClientTodo[]>,
  ) =>
    queryOptions({
      ...options,
      queryKey: keys.list({ status: vars.status }),
      queryFn: () =>
        getTodosByStatusFn({
          data: { status: vars.status },
        }),
    }),
}
