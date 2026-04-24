import {
  CreateTodoSchema,
  todos,
  TodoSchema,
} from '#/entities/todo/model.server'
import { withStringId } from '#/shared/lib/db.server'
import { Elysia, t } from 'elysia'

export const todoApi = new Elysia({ prefix: '/todos' })
  .get(
    '/',
    async () => {
      const docs = await todos.find().toArray()
      return docs.map(withStringId)
    },
    {
      response: t.Array(TodoSchema),
    },
  )
  .post(
    '/',
    async ({ body }) => {
      const now = Date.now()

      const doc = {
        text: body.text,
        isComplete: false,
        createdAt: now,
        updatedAt: now,
      }

      const result = await todos.insertOne(doc)

      return {
        ...doc,
        _id: result.insertedId.toString(),
      }
    },
    {
      body: CreateTodoSchema,
      response: TodoSchema,
    },
  )
