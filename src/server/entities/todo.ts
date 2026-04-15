import type { Static } from 'elysia'
import { Elysia, t } from 'elysia'
import type { ObjectId, OptionalId } from 'mongodb'
import { db, withStringId } from '../db'

const TodoSchema = t.Object(
  {
    _id: t.String(),
    text: t.String(),
    isComplete: t.Boolean(),
    createdAt: t.Number(),
    updatedAt: t.Number(),
  },
  { additionalProperties: false },
)

const CreateTodoSchema = t.Object({
  text: t.String(),
})

type TodoDB = Omit<Static<typeof TodoSchema>, '_id'> & { _id: ObjectId }

const todos = db.collection<OptionalId<TodoDB>>('todos')

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
