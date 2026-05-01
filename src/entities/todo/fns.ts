import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodosByBorough,
  toggleTodo,
  updateTodoText,
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
      id: v.string(),
    }),
  )
  .handler(({ data }) => toggleTodo(data.id))

export const updateTodoTextFn = createServerFn()
  .inputValidator(
    v.object({
      id: v.string(),
      text: v.string(),
    }),
  )
  .handler(({ data }) => updateTodoText(data.id, data.text))

export const deleteTodoFn = createServerFn()
  .inputValidator(
    v.object({
      id: v.string(),
    }),
  )
  .handler(({ data }) => deleteTodo(data.id))
