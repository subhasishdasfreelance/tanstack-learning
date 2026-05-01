import type { ObjectId } from 'mongodb'

export interface Todo {
  _id: ObjectId
  text: string
  completed: boolean
  createdAt: number
  updatedAt: number
}

export type ClientTodo = Omit<Todo, '_id'> & { id: string }
