import CreateTodo from '#/sections/todos/new/CreateTodo'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/todos/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateTodo />
}
