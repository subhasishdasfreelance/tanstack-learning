import type { ObjectId } from 'mongodb'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_CONN_STRING as string)

export const db = client.db('checkmate-dev')

export const connectDB = async () => {
  await client.connect()
  console.log('Mongo connected')
}

export const withStringId = <T extends { _id: ObjectId }>(
  doc: T,
): Omit<T, '_id'> & { _id: string } => ({
  ...doc,
  _id: doc._id.toString(),
})
