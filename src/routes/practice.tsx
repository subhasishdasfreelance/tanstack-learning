import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/practice')({
  component: Practice,
})

function Practice() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="container mx-auto px-4">practice</div>
    </div>
  )
}
