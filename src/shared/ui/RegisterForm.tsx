import FormInput from '#/shared/ui/FormInput'
import { Button } from '@heroui/react'
import { useForm, useStore } from '@tanstack/react-form'
import { useSelector } from '@tanstack/react-store'

type RegisterFormType = {
  firstName: string
  lastName: string
  age: number
  email: string
  password: string
  confirmPassword: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  skills: {
    name: string
    id: string
    level: 'beginner' | 'intermediate' | 'expert'
  }[]
  acceptTerms: boolean
}

const defaultFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
  },
  skills: [],
  acceptTerms: false,
}

export default function RegisterForm() {
  const form = useForm({
    defaultValues: defaultFormValues,
    onSubmit: (data) => console.log('data', data),
  })

  console.log('form', form)

  const storeFirstName = useSelector(
    form.store,
    (state) => state.values.firstName,
  )

  const storeIsDirty = useSelector(form.store, (state) => state.isDirty)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="container mx-auto px-4 py-8">
        RegisterForm
        <pre>{JSON.stringify(form.state, null, 2)}</pre>
        {storeFirstName}-{storeIsDirty ? 'yes' : 'No'}
        <form
          onSubmit={(ev) => {
            ev.preventDefault()
            form.handleSubmit()
          }}
        >
          <form.Field name="firstName">
            {(field) => {
              console.log('field', field)
              return (
                <>
                  <pre>{JSON.stringify(field.state.meta, null, 2)}</pre>
                  <FormInput
                    name="firstName"
                    placeholder="Please enter your name"
                    value={field.state.value}
                    setValue={(val) => field.handleChange(val)}
                    onBlur={field.handleBlur}
                  />
                </>
              )
            }}
          </form.Field>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  )
}
