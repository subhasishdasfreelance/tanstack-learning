import {
  createTodo,
  getAllTodos,
  getTodosByBorough,
  toggleTodo,
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
  .handler(({ data }) => createTodo(data.text))

export const toggleTodoFn = createServerFn()
  .inputValidator(
    v.object({
      _id: v.pipe(v.string()),
    }),
  )
  .handler(({ data }) => toggleTodo(data._id))
