import { createUser, getUsers } from '#/entities/todo/logic';
import { createServerFn } from '@tanstack/react-start';

export const getUsersFn = createServerFn().handler(getUsers)

export const createUserFn = createServerFn()
  .inputValidator((input: { name: string; email: string }) => input)
  .handler(( input ) => createUser(input))