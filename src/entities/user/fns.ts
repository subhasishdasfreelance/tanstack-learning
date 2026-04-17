import { createServerFn } from '@tanstack/react-start'
import type { InferOutput } from 'valibot'
import type { CreateUserSchema } from './schema'
import { createUser, getUsers } from './server'

export const getUsersFn = createServerFn().handler(getUsers)

export const createUserFn = createServerFn()
  .inputValidator((input: InferOutput<typeof CreateUserSchema>) => input)
  .handler((input) => {
    return createUser(input.data)
  })
