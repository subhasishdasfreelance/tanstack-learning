import { signOut } from '#/shared/lib/auth-client'
import { getSession } from '#/shared/lib/auth.funcitons'
import { Button } from '@heroui/react'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const session = await getSession()

    if (!session) {
      throw redirect({ to: '/login' })
    }

    return { user: session.user }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = Route.useRouteContext()
  const navigate = useNavigate()

  return (
    <div>
      Welcome, {user.name}!
      <Button
        onClick={() =>
          signOut(() => {
            navigate({ to: '/login' })
          })
        }
      >
        Sign out
      </Button>
    </div>
  )
}
