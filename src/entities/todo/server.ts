import { db } from '#/shared/lib/db'
import { createServerFn } from '@tanstack/react-start'
import type { ObjectId, OptionalId } from 'mongodb'

export interface Todo {
  _id: ObjectId
  text: string
}

const todoCollection = db.collection<OptionalId<Todo>>('todos')

export const getAllTodosFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const todos = await todoCollection.find({}).limit(100).toArray()
    return todos.map((todo) => ({
      ...todo,
      _id: todo._id.toString(),
    }))
  },
)

export const getTodosByBorough = createServerFn({
  method: 'GET',
}).handler(async () => {
  const todos = await todoCollection
    .find({
      borough: 'Queens',
      name: { $regex: 'Moon', $options: 'i' },
    })
    .limit(100)
    .toArray()

  return todos.map((todo) => ({
    ...todo,
    _id: todo._id.toString(),
  }))
})

export const createTodoFn = createServerFn()
  .inputValidator((input: { text: string }) => input)
  .handler(async ({ data }) => {
    const res = await todoCollection.insertOne(data)

    return {
      ...data,
      _id: res.insertedId.toString(),
    }
  })
