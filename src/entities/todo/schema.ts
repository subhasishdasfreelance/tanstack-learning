import type { ObjectId } from "mongodb"

export interface Todo {
  _id: ObjectId
  text: string
}