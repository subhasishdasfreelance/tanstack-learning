import { db } from '#/shared/lib/db.server'
import type { Collection, Document, ObjectId } from 'mongodb'

export const withStringId = <T extends { _id: ObjectId }>(
  doc: T,
): Omit<T, '_id'> & { id: string } => ({
  ...doc,
  id: doc._id.toString(),
})

export function getCollection<T extends Document>(name: string): Collection<T> {
  return db.collection<T>(name)
}
