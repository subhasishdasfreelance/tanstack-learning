import { eden } from '#/client/eden'
import { queryOptions } from '@tanstack/react-query'

export const todoKeys = {
  all: ['todos'] as const,
  list: () => [...todoKeys.all] as const,
  detail: (id: number) => [...todoKeys.all, id] as const,
}

export const todosApi = {
  list: () =>
    queryOptions({
      queryKey: todoKeys.list(),
      queryFn: async () => {
        const res = await eden.todos.get()
        return res.data
      },
    }),

  create: () => ({
    mutationFn: async (data: { text: string }) => {
      const res = await eden.todos.post(data)
      return res.data
    },
  }),
}
