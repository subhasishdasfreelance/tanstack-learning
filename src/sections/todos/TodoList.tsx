import { useToggleTodo } from '#/entities/todo/hooks'
import type { Todo } from '#/entities/todo/schema'
import { Checkbox, Label } from '@heroui/react'

type Props = { todos: (Omit<Todo, '_id'> & { _id: string })[] }

export default function TodoList({ todos }: Props) {
  const { toggleTodo } = useToggleTodo()

  return (
    <div className="max-w-xs mx-auto border border-muted rounded-xl p-4 flex flex-col bg-background">
      <h2>List of Todos</h2>
      <p className="subheader">Lists of your existing todos</p>

      <div className="">
        {todos.map((item) => (
          <div key={item._id} className="flex gap-2">
            <Checkbox
              id="todo item"
              isSelected={item.completed}
              onChange={() => toggleTodo({ _id: item._id })}
            >
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Content>
                <Label htmlFor="todo item">{item.text}</Label>
              </Checkbox.Content>
            </Checkbox>
          </div>
        ))}
      </div>
    </div>
  )
}
