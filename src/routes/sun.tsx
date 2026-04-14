import { useUsers } from '#/client/entities/user/hooks'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sun')({
  component: RouteComponent,
})

function RouteComponent() {
  const users = useUsers()

  // console.log('users', users.data?.[0].name)

  return <div>Hello another route!!</div>
}
