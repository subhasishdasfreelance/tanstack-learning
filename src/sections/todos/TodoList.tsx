import {
  useDeleteTodo,
  useToggleTodo,
  useUpdateTodoText,
} from '#/entities/todo/hooks'
import type { ClientTodo } from '#/entities/todo/schema'
import useMultiState from '#/shared/lib/useMultiState'
import Alert from '#/shared/ui/Alert'
import FormInput from '#/shared/ui/FormInput'
import { Button, Checkbox, Label, useOverlayState } from '@heroui/react'
import { IoAlertCircleOutline } from 'react-icons/io5'

const initialState = {
  editingId: '',
  editedText: '',
}

type Props = { todos: ClientTodo[] }

export default function TodoList({ todos }: Props) {
  const { mutate: toggleTodo } = useToggleTodo()
  const { mutate: updateTodoText } = useUpdateTodoText()
  const { mutate: deleteTodo } = useDeleteTodo()
  const alertState = useOverlayState()
  const [st, setSt] = useMultiState(initialState)

  return (
    <div className="max-w-xs mx-auto border border-muted rounded-xl p-4 flex flex-col bg-background">
      <h2>List of Todos</h2>
      <p className="subheader mb-6">Lists of your existing todos</p>

      <div className="">
        {todos.map((item) => (
          <div key={item.id} className="flex gap-2 mb-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                alertState.open()
                setSt({
                  editedText:
                    todos.find((todoItem) => todoItem.id === item.id)?.text ||
                    '',
                  editingId: item.id,
                })
              }}
            >
              Edit
            </Button>
            <Checkbox
              id="todo item"
              isSelected={item.completed}
              onChange={() => toggleTodo({ id: item.id })}
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

      <Alert state={alertState}>
        <Alert.Header
          icon={<IoAlertCircleOutline size={30} className="text-blue-700" />}
        >
          Hello
        </Alert.Header>
        <Alert.Body>
          <FormInput
            name="text"
            value={st.editedText}
            setValue={(val) => setSt({ editedText: val })}
            label="Edit todo text and click update"
            placeholder="Please edit the todo text"
            desc="Please edit"
          />
        </Alert.Body>
        <Alert.Footer>
          <Button
            variant="danger-soft"
            onClick={() => {
              deleteTodo({ id: st.editingId })
            }}
          >
            Delete
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              updateTodoText({ id: st.editingId, text: st.editedText })
            }}
          >
            Update
          </Button>
        </Alert.Footer>
      </Alert>
    </div>
  )
}
