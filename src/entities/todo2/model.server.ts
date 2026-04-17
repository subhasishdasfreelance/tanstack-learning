import { db } from '#/shared/lib/db'
import type { Static } from 'elysia'
import { t } from 'elysia'
import type { ObjectId, OptionalId } from 'mongodb'

export const TodoSchema = t.Object(
  {
    _id: t.String(),
    text: t.String(),
    isComplete: t.Boolean(),
    createdAt: t.Number(),
    updatedAt: t.Number(),
  },
  { additionalProperties: false },
)

export const CreateTodoSchema = t.Object({
  text: t.String(),
})

export type TodoDB = Omit<Static<typeof TodoSchema>, '_id'> & { _id: ObjectId }

export const todos = db.collection<OptionalId<TodoDB>>('todos')
