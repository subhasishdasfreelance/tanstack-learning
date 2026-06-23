import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId/$')({
  component: RouteComponent,
})

function RouteComponent() {
  const { _splat, postId } = Route.useParams()

  return (
    <div>
      Hello "/posts/{postId}/{_splat}"!
    </div>
  )
}
