import type { Static } from 'elysia'
import { Elysia, t } from 'elysia'
import type { ObjectId, OptionalId } from 'mongodb'
import { db, withStringId } from '../db'

const UserSchema = t.Object({
  _id: t.String(),
  name: t.String(),
})

const CreateUserSchema = t.Object({
  name: t.String(),
})

type User = Static<typeof UserSchema>
type UserDB = Omit<User, '_id'> & { _id: ObjectId }

const users = db.collection<OptionalId<UserDB>>('users')

export const userApi = new Elysia({ prefix: '/users' })
  .get(
    '/',
    async () => {
      const docs = await users.find().toArray()
      return docs.map(withStringId)
    },
    {
      response: t.Array(UserSchema),
    },
  )
  .post(
    '/',
    async ({ body }) => {
      const result = await users.insertOne(body)

      return {
        ...body,
        _id: result.insertedId.toString(),
      }
    },
    {
      body: CreateUserSchema,
      response: UserSchema,
    },
  )
