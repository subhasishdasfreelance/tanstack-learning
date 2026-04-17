// src/features/users/users.data.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsersFn, createUserFn } from './server'

export const usersData = {
  // 🔑 keys
  keys: {
    all: ['users'] as const,
  },

  // 📦 queries
  queries: {
    list: () => ({
      queryKey: usersData.keys.all,
      queryFn: () => getUsersFn(),
    }),
  },

  // 🔁 mutations
  mutations: {
    create: () => ({
      mutationFn: createUserFn,
    }),
  },

  // 🪝 hooks
  hooks: {
    useUsers() {
      return useQuery(usersData.queries.list())
    },

    useCreateUser() {
      const qc = useQueryClient()

      return useMutation({
        ...usersData.mutations.create(),
        onSuccess: () => {
          qc.invalidateQueries({
            queryKey: usersData.keys.all,
          })
        },
      })
    },
  },
}
