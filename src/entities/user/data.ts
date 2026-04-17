import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsersFn, createUserFn } from './fns'

export const keys = {
  all: ['users'] as const,
}

export const userQueries = {
  list: () => ({
    queryKey: keys.all,
    queryFn: () => getUsersFn(),
  }),
}

export const userMutations = {
  create: () => ({
    mutationFn: createUserFn,
  }),
}

export const userHooks = {
  useUsers() {
    return useQuery(userQueries.list())
  },

  useCreateUser() {
    const qc = useQueryClient()

    return useMutation({
      ...userMutations.create(),
      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: keys.all,
        })
      },
    })
  },
}
