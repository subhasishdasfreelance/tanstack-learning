import { db } from '#/shared/lib/db.server'
import type { ObjectId, OptionalId } from 'mongodb'
import type { InferOutput } from 'valibot'
import type { UserSchema } from './schema'
import { withStringId } from '#/shared/lib/dbUtils'

type UserDB = Omit<InferOutput<typeof UserSchema>, '_id'> & { _id: ObjectId }
const usersCollection = db.collection<OptionalId<UserDB>>('users')

export async function getUsers() {
  const res = await usersCollection.find().toArray()
  return res.map(withStringId)
}

export async function createUser(input: { name: string; email: string }) {
  const res = await usersCollection.insertOne(input)

  return {
    ...input,
    id: res.insertedId.toString(),
  }
}
