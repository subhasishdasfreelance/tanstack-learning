import { useCreateTodo } from '#/client/entities/todo/hooks'
import { useCreateUser, useUsers } from '#/client/entities/user/hooks'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sun')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = useUsers()
  const { mutate: createUser, isPending: isCreateUserLoading } = useCreateUser()
  const { mutate: createTodo, isPending: isCreateTodoLoading } = useCreateTodo()

  // console.log('users', users.data?.[0].name)

  return (
    <div>
      Hello another route!!
      {data?.[0]._id}
      <button onClick={() => createUser({ name: 'Sun' })}>createUser</button>
      <button onClick={() => createTodo({ text: 'sample todo' })}>
        createTodo
      </button>
    </div>
  )
}
