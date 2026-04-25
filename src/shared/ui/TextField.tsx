import { Description, Input, Label, TextArea, TextField } from '@heroui/react'

type Props = {
  value: string
  setValue: (val: string) => void
  label?: string
  desc?: string | false
  name: string
  rows?: number
  placeholder: string
}

export function FormInput({
  value,
  setValue,
  label,
  desc,
  name,
  rows,
  placeholder,
}: Props) {
  return (
    <TextField name={name} value={value} onChange={setValue}>
      {label && <Label>{label}</Label>}
      {rows ? (
        <TextArea
          placeholder={placeholder}
          rows={rows}
          className="shadow-inner ring-1 ring-muted"
        />
      ) : (
        <Input
          placeholder={placeholder}
          className="shadow-inner ring-1 ring-muted"
        />
      )}
      {desc && <Description>{desc}</Description>}
    </TextField>
  )
}
