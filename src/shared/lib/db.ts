import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_CONN_STRING as string)

export const db = client.db('todoapp')

export const connectDB = async () => {
  await client.connect()
  console.log('Mongo connected')
}
