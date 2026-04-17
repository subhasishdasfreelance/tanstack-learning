// src/routes/users.tsx
import { todoQueries, useTodos } from '#/entities/restaurant/data'
import { queryClient } from '#/integrations/tanstack-query/query-client'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sun')({
  loader: async () => {
    await queryClient.ensureQueryData(todoQueries.list())
  },
  component: UsersPage,
})

function UsersPage() {
  // const { data: users, isLoading } = userHooks.useUsers()
  // const createUser = userHooks.useCreateUser()

  const { data } = useTodos()

  // if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>Users</h1>

      {/* {users?.map((u) => (
        <div key={u.id}>{u.name}</div>
      ))} */}

      {/* <button
        onClick={() =>
          createUser.mutate({ data: { email: 'sfd', name: 'sdfj' } })
        }
      >
        Add User
      </button> */}

      <p>---------client hook todos-----------</p>
      {data?.map((item) => (
        <p key={item._id}>{item.text}</p>
      ))}
    </div>
  )
}
