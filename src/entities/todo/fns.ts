import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodosByStatus,
  toggleTodo,
  updateTodoText,
} from '#/entities/todo/server'
import { createServerFn } from '@tanstack/react-start'
import * as v from 'valibot'

export const getAllTodosFn = createServerFn({ method: 'GET' }).handler(() =>
  getAllTodos(),
)

export const getTodosByStatusFn = createServerFn({
  method: 'GET',
})
  .inputValidator(
    v.object({
      status: v.boolean(),
    }),
  )
  .handler(({ data }) => getTodosByStatus(data.status))

export const createTodoFn = createServerFn({ method: 'POST' })
  .inputValidator(
    v.object({
      text: v.pipe(v.string(), v.minLength(2, 'Minimum 2 chars please')),
    }),
  )
  .handler(({ data }) => createTodo(data.text))

export const toggleTodoFn = createServerFn({ method: 'POST' })
  .inputValidator(
    v.object({
      id: v.string(),
    }),
  )
  .handler(({ data }) => toggleTodo(data.id))

export const updateTodoTextFn = createServerFn({ method: 'POST' })
  .inputValidator(
    v.object({
      id: v.string(),
      text: v.string(),
    }),
  )
  .handler(({ data }) => updateTodoText(data.id, data.text))

export const deleteTodoFn = createServerFn({ method: 'POST' })
  .inputValidator(
    v.object({
      id: v.string(),
    }),
  )
  .handler(({ data }) => deleteTodo(data.id))
