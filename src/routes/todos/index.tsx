import { todoQueries } from '#/entities/todo/queries'
import TodosPage from '#/sections/todos'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/todos/')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(todoQueries.list())
  },
})

function RouteComponent() {
  return <TodosPage />
}
