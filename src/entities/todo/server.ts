import type { Todo } from '#/entities/todo/schema'
import { db } from '#/shared/lib/db.server'
import { ObjectId } from 'mongodb'
import type { OptionalId } from 'mongodb'

const todoCollection = db.collection<OptionalId<Todo>>('todos')

export const getAllTodos = async () => {
  // const todos = await todoCollection.find({}).limit(100).toArray()
  const todos = await todoCollection.find({}).toArray()

  return todos.map((todo) => {
    const { _id, ...rest } = todo
    {
      return { ...rest, id: todo._id.toString() }
    }
  })
}

export const getTodosByStatus = async (status: boolean) => {
  const todos = await todoCollection
    .find({
      completed: status,
    })
    // .limit(100)
    .toArray()

  return todos.map((todo) => {
    const { _id, ...rest } = todo
    {
      return {
        ...rest,
        id: todo._id.toString(),
      }
    }
  })
}

export const createTodo = async (text: string) => {
  const res = await todoCollection.insertOne({
    text,
    completed: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })

  return {
    text,
    id: res.insertedId.toString(),
  }
}

export const toggleTodo = async (todoId: string) => {
  const res = await todoCollection.updateOne({ _id: new ObjectId(todoId) }, [
    {
      $set: {
        completed: { $not: '$completed' },
      },
    },
  ])

  if (res.matchedCount === 0) {
    throw new Error('Todo not found')
  }
}

export const updateTodoText = async (todoId: string, text: string) => {
  const res = await todoCollection.updateOne(
    { _id: new ObjectId(todoId) },
    {
      $set: { text },
    },
  )

  if (res.matchedCount === 0) {
    throw new Error('Todo not found')
  }
}

export const deleteTodo = async (todoId: string) => {
  const res = await todoCollection.deleteOne({
    _id: new ObjectId(todoId),
  })

  if (res.deletedCount === 0) {
    throw new Error('Todo not found')
  }
}
