import { createTodoFn } from "#/entities/todo/fns";

export const todoMutations = {
  create: () => ({
    mutationFn: createTodoFn,
  }),
}