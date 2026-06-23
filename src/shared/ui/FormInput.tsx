import { Description, Input, Label, TextArea, TextField } from '@heroui/react'
import type { FocusEventHandler } from 'react'

type BaseProps = {
  value: string
  setValue: (val: string) => void
  label?: string
  desc?: string | false
  name: string
  placeholder: string
}

type TextAreaProps = BaseProps & {
  rows: number
  type?: never
  onBlur?: FocusEventHandler<HTMLTextAreaElement>
}

type InputProps = BaseProps & {
  type?: 'text' | 'password'
  onBlur?: FocusEventHandler<HTMLInputElement>
}

type Props = TextAreaProps | InputProps

export default function FormInput(props: Props) {
  const { value, setValue, label, desc, name, placeholder } = props

  return (
    <TextField name={name} value={value} onChange={setValue}>
      {label && <Label>{label}</Label>}

      {'rows' in props ? (
        <TextArea
          placeholder={placeholder}
          rows={props.rows}
          className="shadow-inner border-2 border-muted focus:border-focus focus:ring-0"
          onBlur={props.onBlur}
        />
      ) : (
        <Input
          type={props.type}
          placeholder={placeholder}
          className="shadow-inner border-2 border-muted focus:border-focus focus:ring-0"
          onBlur={props.onBlur}
        />
      )}

      {desc && <Description>{desc}</Description>}
    </TextField>
  )
}
