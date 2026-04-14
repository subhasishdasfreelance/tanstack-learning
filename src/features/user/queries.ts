import { getApi } from '@/lib/api'

export const getUsers = async () => {
  const api = getApi()
  return api.users.get()
}
