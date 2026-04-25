import { useTodos } from '#/entities/todo/hooks'
import EmptyTodos from '#/sections/todos/EmptyTodos'
import TodoList from '#/sections/todos/TodoList'
import { Button } from '@heroui/react'
import { Link } from '@tanstack/react-router'
import { FiPlus } from 'react-icons/fi'

export default function TodosPage() {
  const { data: todos = [] } = useTodos()
  console.log('todos', todos)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <div className="flex gap-8 items-center justify-between">
          <h1>Todo List</h1>
          <Button>
            <Link className="flex gap-1 items-center" to="/todos/new">
              <FiPlus />
              Add Todo
            </Link>
          </Button>
        </div>

        <div className="py-10">
          {todos.length === 0 && <EmptyTodos />}
          {todos.length !== 0 && <TodoList todos={todos} />}
        </div>
      </div>
    </div>
  )
}
