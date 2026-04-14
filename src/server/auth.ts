import { Elysia } from 'elysia'

export const authApi = new Elysia({ prefix: '/auth' }).post(
  '/login',
  ({ body }) => {
    return { token: 'fake', user: body }
  },
)
