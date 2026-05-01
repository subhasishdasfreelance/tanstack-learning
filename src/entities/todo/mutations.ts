import {
  createTodoFn,
  deleteTodoFn,
  toggleTodoFn,
  updateTodoTextFn,
} from '#/entities/todo/fns'
import { keys } from '#/entities/todo/keys'
import type { ClientTodo } from '#/entities/todo/schema'
import {
  invalidateQueries,
  onMutate,
  pipe,
  rollbackToPrevious,
  swapTempId,
} from '#/shared/lib/mutation.helper'
import { mutationOptions } from '@tanstack/react-query'
import { nanoid } from 'nanoid'

export const todoMutations = {
  create: () =>
    mutationOptions({
      mutationFn: createTodoFn,
      onMutate: async (vars, context) => {
        const base = await onMutate<ClientTodo[]>(keys.all)(vars, context)

        const qc = context.client
        qc.setQueryData(keys.all, (old: ClientTodo[] = []) => [
          ...old,
          {
            ...vars.data,
            id: `temp-${nanoid()}`,
          },
        ])

        return base
      },
      onSuccess: pipe(
        swapTempId<ClientTodo>(keys.all),
        invalidateQueries(keys.all),
      ),
      onError: rollbackToPrevious<ClientTodo[]>(keys.all),
      // onSettled: invalidateQueries(keys.all),
    }),

  toggle: () =>
    mutationOptions({
      mutationFn: toggleTodoFn,
      onMutate: async (vars, context) => {
        const base = await onMutate<ClientTodo[]>(keys.all)(vars, context)

        const qc = context.client
        qc.setQueryData(keys.all, (old: ClientTodo[] = []) =>
          old.map((todo) =>
            todo.id === vars.data.id
              ? { ...todo, completed: !todo.completed }
              : todo,
          ),
        )

        return base
      },
      onSuccess: invalidateQueries(keys.all),
      onError: rollbackToPrevious<ClientTodo[]>(keys.all),
    }),

  updateText: () =>
    mutationOptions({
      mutationFn: updateTodoTextFn,
      onMutate: async (vars, context) => {
        const base = await onMutate<ClientTodo[]>(keys.all)(vars, context)

        const qc = context.client
        qc.setQueryData(keys.all, (old: ClientTodo[] = []) =>
          old.map((todo) =>
            todo.id === vars.data.id ? { ...todo, text: vars.data.text } : todo,
          ),
        )

        return base
      },
      onSuccess: invalidateQueries(keys.all),
      onError: rollbackToPrevious<ClientTodo[]>(keys.all),
    }),

  delete: () =>
    mutationOptions({
      mutationFn: deleteTodoFn,
      onMutate: async (vars, context) => {
        const base = await onMutate<ClientTodo[]>(keys.all)(vars, context)

        const qc = context.client
        qc.setQueryData(keys.all, (old: ClientTodo[] = []) =>
          old.filter((todo) => todo.id !== vars.data.id),
        )

        return base
      },
      onSuccess: invalidateQueries(keys.all),
      onError: rollbackToPrevious<ClientTodo[]>(keys.all),
    }),
}
