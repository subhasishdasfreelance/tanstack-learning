import { keys } from '#/entities/todo/keys'
import type {
  CreateTodoInput,
  ToggleTodoInput,
} from '#/entities/todo/mutations'
import { todoMutations } from '#/entities/todo/mutations'
import { todoQueries } from '#/entities/todo/queries'
import type { Todo } from '#/entities/todo/schema'
import { mutateWrapper, mutateWrapperAsync } from '#/shared/lib/mutation.helper'
import type { QueryClient } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import { nanoid } from 'nanoid'

export const useTodos = () => {
  return useQuery(todoQueries.list())
}

export const useCreateTodo = () => {
  const createTodoCallback = (qc: QueryClient, data: CreateTodoInput) => {
    qc.setQueryData(keys.all, (old: Todo[] = []) => [
      ...old,
      {
        ...data,
        id: nanoid(), // temporary placeholder
      },
    ])
  }

  const mutation = useMutation({
    ...todoMutations.create(createTodoCallback),
  })

  const createTodo = mutateWrapper(mutation)
  const createTodoAsync = mutateWrapperAsync(mutation)

  return {
    ...mutation,
    createTodo,
    createTodoAsync,
  }
}

export const useToggleTodo = () => {
  const toggleTodoCallback = (qc: QueryClient, data: ToggleTodoInput) => {
    qc.setQueryData(keys.all, (old: any[] = []) =>
      old.map((todo) =>
        todo._id === data._id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const mutation = useMutation({
    ...todoMutations.toggle(toggleTodoCallback),
  })

  const toggleTodo = mutateWrapper(mutation)
  const toggleTodoAsync = mutateWrapperAsync(mutation)

  return {
    ...mutation,
    toggleTodo,
    toggleTodoAsync,
  }
}
