import type { Todo } from '#/entities/todo/schema'
import { db } from '#/shared/lib/db.server'
import type { OptionalId } from 'mongodb'

const todoCollection = db.collection<OptionalId<Todo>>('todos')

export const getAllTodos = async () => {
  const todos = await todoCollection.find({}).limit(100).toArray()
  return todos.map((todo) => ({
    ...todo,
    _id: todo._id.toString(),
  }))
}

export const getTodosByBorough = async () => {
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
}

export const createTodo = async (data: { text: string }) => {
  const res = await todoCollection.insertOne(data)

  return {
    ...data,
    _id: res.insertedId.toString(),
  }
}
