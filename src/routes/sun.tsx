// src/routes/users.tsx
import { getAllTodosFn } from '#/entities/todo/fns'
import { useTodos } from '#/entities/todo/hooks'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sun')({
  loader: async () => {
    return getAllTodosFn()
  },
  component: UsersPage,
})

function UsersPage() {
  const serverTodos = Route.useLoaderData()

  const { data } = useTodos()

  // if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>Users</h1>

      <p>---------server hook todos-----------</p>
      {serverTodos.map((item) => (
        <p key={item._id}>{item.text}</p>
      ))}
      <p>---------client hook todos-----------</p>
      {data?.map((item) => (
        <p key={item._id}>{item.text}</p>
      ))}
    </div>
  )
}
