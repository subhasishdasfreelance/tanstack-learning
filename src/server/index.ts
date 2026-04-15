import { userApi } from '#/server/entities/user'
import { Elysia } from 'elysia'
import { connectDB } from './db'
import { todoApi } from '#/server/entities/todo'

await connectDB()

export const app = new Elysia({ prefix: '/api' })
  .use(userApi)
  .use(todoApi)
  .get('/', 'Hello Elysia!')

export type App = typeof app
