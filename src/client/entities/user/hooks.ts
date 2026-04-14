import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi, userKeys } from './api'

export const useUsers = () => {
  return useQuery({ ...usersApi.list() })
  // return useQuery(usersApi.list())
}

export const useCreateUser = () => {
  const qc = useQueryClient()

  return useMutation({
    ...usersApi.create(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: userKeys.all })
    },
  })
}
