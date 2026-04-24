import {
  createTodo,
  getAllTodos,
  getTodosByBorough,
} from '#/entities/todo/server'
import { createServerFn } from '@tanstack/react-start'

export const getAllTodosFn = createServerFn({ method: 'GET' }).handler(() =>
  getAllTodos(),
)

export const getTodosByBoroughFn = createServerFn({
  method: 'GET',
}).handler(() => getTodosByBorough())

export const createTodoFn = createServerFn()
  .inputValidator((input: { text: string }) => input)
  .handler(({ data }) => createTodo(data))
