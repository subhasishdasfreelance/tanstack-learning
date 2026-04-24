import { db } from '#/shared/lib/db.server'
import type { ObjectId, OptionalId } from 'mongodb'
import type { InferOutput } from 'valibot'
import type { UserSchema } from './schema'

type UserDB = Omit<InferOutput<typeof UserSchema>, '_id'> & { _id: ObjectId }
const usersCollection = db.collection<OptionalId<UserDB>>('users')

export async function getUsers() {
  return usersCollection.find().toArray()
}

export async function createUser(input: { name: string; email: string }) {
  const res = await usersCollection.insertOne(input)

  return {
    id: res.insertedId.toString(),
    ...input,
  }
}
