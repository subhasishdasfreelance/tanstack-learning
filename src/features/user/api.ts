import { useQuery } from '@tanstack/react-query'
import { eden } from '@/lib/eden'

export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await eden.users.get()
      return res.data
    },
  })
