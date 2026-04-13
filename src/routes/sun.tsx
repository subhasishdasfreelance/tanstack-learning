import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sun')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sun"!</div>
}
