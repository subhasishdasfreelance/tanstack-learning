import { MongoClient } from 'mongodb'

export const mongoClient = new MongoClient(process.env.MONGO_CONN_STRING as string)

export const db = mongoClient.db('todoapp')

export const connectDB = async () => {
  await mongoClient.connect()
  console.log('Mongo connected')
}
