import { Elysia, t } from 'elysia'

const UserSchema = t.Object({
  id: t.Number(),
  name: t.String(),
})

export const userApi = new Elysia({ prefix: '/users' })
  .get(
    '/',
    () => [
      { id: 1, name: 'Subhasish' },
      { id: 2, name: 'Alex' },
    ],
    {
      response: t.Array(UserSchema),
    },
  )
  .post(
    '/',
    ({ body }) => {
      return { id: Math.random(), name: body.name }
    },
    {
      body: t.Object({
        name: t.String(),
      }),
      response: UserSchema,
    },
  )
