import { queryOptions } from '@tanstack/react-query'
import { eden } from '@/lib/eden'

export const userKeys = {
  all: ['users'] as const,
  list: () => [...userKeys.all] as const,
  detail: (id: number) => [...userKeys.all, id] as const,
}

export const usersApi = {
  list: () =>
    queryOptions({
      queryKey: userKeys.list(),
      queryFn: async () => {
        const res = await eden.users.get()
        console.log('res.data', res.data)
        return res.data
      },
    }),

  create: () => ({
    mutationFn: async (data: { name: string }) => {
      const res = await eden.users.post(data)
      return res.data
    },
  }),
}
