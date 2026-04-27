import { useCreateTodo } from '#/entities/todo/hooks'
import { getErrorMessage } from '#/shared/lib/getErrorMessage'
import useMultiState from '#/shared/lib/useMultiState'
import { FormInput } from '#/shared/ui/TextField'
import { Button, toast } from '@heroui/react'
import { useNavigate } from '@tanstack/react-router'

const inititalState = {
  text: '',
}

export default function CreateTodo() {
  const [st, setSt] = useMultiState(inititalState)
  const { createTodo, status } = useCreateTodo()
  const navigate = useNavigate()

  const handleCreateTodo = () => {
    toast.success(`Todo successfully added`, {
      actionProps: {
        children: 'Go to all todos',
        className: 'bg-success text-white',
        onPress: () => {
          navigate({ to: '/todos' })
          toast.clear()
        },
      },
      description: `Added "${st.text}"`,
    })
    createTodo(
      {
        text: st.text,
      },
      {
        // onSuccess
        onError: (err) => {
          const errMsg = getErrorMessage(err)
          toast.danger(errMsg)
        },
      },
    )
  }

  return (
    <div className="bg-background py-4 min-h-screen">
      <div className="max-w-xs mx-auto border border-muted rounded-xl p-4 bg-white dark:bg-black">
        <h1>Add a new Todo</h1>
        <p className="subheader mt-2 mb-6">
          Create new task to add to your todo list
        </p>
        {/* {state.text} */}
        {status}
        <FormInput
          name="text"
          value={st.text}
          setValue={(val) => setSt({ text: val })}
          label="Todo text"
          placeholder="Please enter the todo text"
          desc={!st.text && 'Please add verbs'}
        />

        <Button variant="primary" className="mt-8" onClick={handleCreateTodo}>
          Submit
        </Button>
      </div>
    </div>
  )
}
