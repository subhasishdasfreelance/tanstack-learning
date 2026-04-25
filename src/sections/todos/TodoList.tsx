import type { Todo } from '#/entities/todo/schema'

type Props = { todos: (Omit<Todo, '_id'> & { _id: string })[] }

export default function TodoList({ todos }: Props) {
  return (
    <div className="max-w-xs mx-auto border border-muted rounded-xl p-4 flex flex-col">
      <h2>List of Todos</h2>
      <p className="subheader">Lists of your existing todos</p>

      <div className="mt-6">
        {todos.map((item) => (
          <p key={item._id}>{item.text}</p>
        ))}
      </div>
    </div>
  )
}
