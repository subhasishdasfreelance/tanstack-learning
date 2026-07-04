/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */

interface Todo {
  title: string
  description: string
  completed: boolean
}

type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}