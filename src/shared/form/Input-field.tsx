import { useFieldContext } from '#/shared/form/form'
import { Input } from '@heroui/react'

export default function InputField({ label }: { label: string }) {
  const field = useFieldContext<string>()

  return (
    <div>
      <label>{label}</label>

      <Input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />

      {!!field.state.meta.errors.length && (
        <div>{String(field.state.meta.errors[0].message)}</div>
      )}
    </div>
  )
}
