import { getUsers } from '#/features/user/queries'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/sun')({
  component: RouteComponent,
})

function RouteComponent() {
  useEffect(() => {
    ;(async () => {
      const users = await getUsers()

      console.log('users', users.data?.[0].name)
    })()
  }, [])

  return <div>Hello "/sun"!</div>
}
