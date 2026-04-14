import { useUsers } from '#/features/user/api'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sun')({
  component: RouteComponent,
})

function RouteComponent() {
  // useEffect(() => {
  //   ;(async () => {
  //     const users = await getUsers()

  //     console.log('users', users.data?.[0].name)
  //   })()
  // }, [])
  const users = useUsers()

  console.log('users', users.data?.[0].name)

  return <div>Hello "/sun"!</div>
}
