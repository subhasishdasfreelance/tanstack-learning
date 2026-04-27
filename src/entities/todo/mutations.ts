import { createTodoFn, toggleTodoFn } from '#/entities/todo/fns'
import { keys } from '#/entities/todo/keys'
import type { Todo } from '#/entities/todo/schema'
import {
  createInvalidateOnSettled,
  onMutate,
  createRollbackOnError,
} from '#/shared/lib/mutation.helper'
import type { QueryClient } from '@tanstack/react-query'
import { mutationOptions } from '@tanstack/react-query'

export type CreateTodoInput = {
  text: string
}
export type ToggleTodoInput = {
  _id: string
}

export const todoMutations = {
  create: (createCallBack: (qc: QueryClient, data: CreateTodoInput) => void) =>
    mutationOptions({
      mutationFn: createTodoFn,
      onMutate: async (vars, context) => {
        const base = await onMutate<Todo[]>(keys.all)(vars, context)

        createCallBack(context.client, vars.data)

        return base
      },
      onError: createRollbackOnError<Todo[]>(keys.all),
      onSettled: createInvalidateOnSettled(keys.all),
    }),

  toggle: (toggleCallBack: (qc: QueryClient, data: ToggleTodoInput) => void) =>
    mutationOptions({
      mutationFn: toggleTodoFn,
      onMutate: async (vars, context) => {
        const base = await onMutate<Todo[]>(keys.all)(vars, context)

        toggleCallBack(context.client, vars.data)

        return base
      },
      onError: createRollbackOnError<Todo[]>(keys.all),
      onSettled: createInvalidateOnSettled(keys.all),
    }),
}
