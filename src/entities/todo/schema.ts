import type { ObjectId } from "mongodb"

export interface Todo {
  _id: ObjectId
  text: string
  completed: boolean
  createdAt: number
  updatedAt: number
}