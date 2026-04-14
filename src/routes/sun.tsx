import { useUsers } from '#/features/user/hooks'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sun')({
  component: RouteComponent,
})

function RouteComponent() {
  const users = useUsers()

  console.log('users', users.data)

  return <div>Hello "/sun"!</div>
}
