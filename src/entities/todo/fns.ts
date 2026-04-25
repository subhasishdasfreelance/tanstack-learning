import {
  createTodo,
  getAllTodos,
  getTodosByBorough,
} from '#/entities/todo/server'
import { createServerFn } from '@tanstack/react-start'
import * as v from 'valibot'

export const getAllTodosFn = createServerFn({ method: 'GET' }).handler(() =>
  getAllTodos(),
)

export const getTodosByBoroughFn = createServerFn({
  method: 'GET',
}).handler(() => getTodosByBorough())

export const createTodoFn = createServerFn()
  .inputValidator(
    v.object({
      text: v.pipe(v.string(), v.minLength(2, 'Minimum 2 chars please')),
    }),
  )
  .handler(({ data }) => createTodo(data))
