import { userApi } from '#/server/entities/user'
import { Elysia } from 'elysia'
import { connectDB } from './db'

await connectDB()

export const app = new Elysia({ prefix: '/api' })
  .use(userApi)
  // .use(authApi)
  .get('/', 'Hello Elysia!')

export type App = typeof app
