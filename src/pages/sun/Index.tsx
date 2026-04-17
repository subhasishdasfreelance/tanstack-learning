import { useTodos } from "#/entities/todo/hooks.client";

export default function SunPage() {
  const {data: todos} = useTodos()

  return (
    <div className="max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        {todos?.map(item => <p key={item._id}>{item.text}</p>)}
      </div>
    </div>
  );
}
