import { Elysia, t } from 'elysia'

export const userApi = new Elysia({ prefix: '/users' })
  .get('/', () => [{ id: 1, name: 'Subhasish' }], {
    response: t.Array(
      t.Object({
        id: t.Number(),
        name: t.String(),
      }),
    ),
  })
  .post(
    '/',
    ({ body }) => {
      return { id: 2, name: body.name }
    },
    {
      body: t.Object({
        name: t.String(),
      }),
      response: t.Object({
        id: t.Number(),
        name: t.String(),
      }),
    },
  )
