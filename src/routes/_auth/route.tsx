import { Button } from '@heroui/react'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    // if  you wanna have a _auth in the url then do [_]auth/login/index.tsx, also [[][]_]auth creates this url /[_]auth
    <div>
      <Link to="/">
        <Button size="sm">Go back</Button>
      </Link>
      <Outlet />
    </div>
  )
}
