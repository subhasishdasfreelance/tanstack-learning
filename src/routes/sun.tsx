// src/routes/users.tsx
import { useTodos } from '#/entities/todo/hooks'
import { todoQueries } from '#/entities/todo/queries'
import { Button } from '@heroui/react'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/sun')({
  loader: async ({ context }) => {
    // return getAllTodosFn()
    await context.queryClient.ensureQueryData(todoQueries.list())
  },
  component: UsersPage,
})

function UsersPage() {
  // const serverTodos = Route.useLoaderData()

  const { data } = useTodos()

  // if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <Button size='lg'>
        <Link to="/new-todo">New Todo</Link>
      </Button>

      {/* <p>---------server hook todos-----------</p>
      {serverTodos.map((item) => (
        <p key={item._id}>{item.text}</p>
      ))} */}
      <p>---------client hook todos-----------</p>
      {data?.map((item) => (
        <p key={item._id}>{item.text}</p>
      ))}
    </div>
  )
}
