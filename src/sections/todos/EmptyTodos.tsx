import { Button } from '@heroui/react'
import { Link } from '@tanstack/react-router'
import { FiPlus } from 'react-icons/fi'

export default function EmptyTodos() {
  return (
    <div className="max-w-xs mx-auto border border-muted rounded-xl p-4 flex flex-col items-center">
      <h2>No Todos</h2>
      <p className="subheader mt-2 mb-6">Try adding a new Todo</p>

      <Button>
        <Link className="flex gap-1 items-center" to="/todos/new">
          <FiPlus />
          Add Todo
        </Link>
      </Button>
    </div>
  )
}
