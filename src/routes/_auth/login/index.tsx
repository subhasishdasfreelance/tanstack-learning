import { useAppForm } from '#/shared/form/form'
import { emailValidator, passwordValidator } from '#/shared/form/validataions'
import { signIn } from '#/shared/lib/auth-client'
import { Button } from '@heroui/react'
import { createFileRoute } from '@tanstack/react-router'
// import { useAppForm } from '#/shared/ui/FieldShell'

export const Route = createFileRoute('/_auth/login/')({
  component: RouteComponent,
})

// export const LoginSchema = v.object({
//   email: v.pipe(
//     v.string(),
//     v.nonEmpty('Email is required'),
//     v.email('Invalid email'),
//   ),
//   password: v.pipe(
//     v.string(),
//     v.nonEmpty('Password is required'),
//     v.minLength(8, 'Password must be at least 8 characters'),
//   ),
// })

// type LoginValues = v.InferOutput<typeof LoginSchema>

function RouteComponent() {
  // const [formSt, setFormSt] = useMultiState({
  //   email: '',
  //   password: '',
  // })

  // const [errors, setErrors] = useState({})

  // function onSubmit() {
  //   const result = validateForm(LoginSchema, formSt)

  //   if (!result.success) {
  //     setErrors(result.errors)
  //     return
  //   }

  //   // submit
  // }

  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },

    // validators: {
    //   onChange: v.object({
    //     email: emailValidator,
    //     password: passwordValidator,
    //   }),
    // },

    onSubmit: ({ value }) => {
      console.log('here submitting')
      console.log(value)
    },
  })

  return (
    <div className="max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <h2 className="text-center">Please login</h2>
        <div className="max-w-xs mx-auto py-8">
          {/* <FormInput
            name="email"
            value={formSt.email}
            setValue={(val) => setFormSt({ email: val })}
            label="Please enter your email"
            placeholder="Ex. subhasishdasfreelance@gmail.com"
            desc={!formSt.email && 'Email should not be blank'}
          />
          <FormInput
            type="password"
            name="password"
            value={formSt.password}
            setValue={(val) => setFormSt({ password: val })}
            label="Please enter your password"
            placeholder=""
            desc={!formSt.password && 'password should not be blank'}
          /> */}

          <form
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <form.AppField
              name="email"
              validators={{ onChange: emailValidator }}
            >
              {(field) => <field.InputField label="Email" />}
            </form.AppField>

            <form.AppField
              name="password"
              validators={{ onChange: passwordValidator }}
            >
              {(field) => <field.InputField label="Password" />}
            </form.AppField>

            <button type="submit">Submit</button>
          </form>
          <Button onClick={signIn}>Sign in with github</Button>
        </div>
      </div>
    </div>
  )
}
