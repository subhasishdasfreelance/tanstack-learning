import useMultiState from '#/shared/lib/useMultiState'
import { FormInput } from '#/shared/ui/TextField'

const inititalState = {
  text: '',
}

export default function CreateTodo() {
  const [state, setState] = useMultiState(inititalState)

  return (
    <div className="max-w-xs mx-auto border border-muted rounded-xl p-4">
      <h1>Add a new Todo</h1>
      <p className="subheader mt-2 mb-6">
        Create new task to add to your todo list
      </p>

      {state.text}

      <FormInput
        name="text"
        value={state.text}
        setValue={(val) => setState({ text: val })}
        label="Todo text"
        placeholder="Please enter the todo text"
        desc="Please add verbs"
      />
    </div>
  )
}
