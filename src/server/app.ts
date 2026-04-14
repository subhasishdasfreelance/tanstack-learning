import { Elysia } from 'elysia'
import { userApi } from './user'
import { authApi } from './auth'

export const app = new Elysia({ prefix: '/api' })
  .use(userApi)
  .use(authApi)
  .get('/', 'Hello Elysia!')