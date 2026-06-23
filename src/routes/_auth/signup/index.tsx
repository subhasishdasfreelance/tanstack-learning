import useMultiState from '#/shared/lib/useMultiState'
import FormInput from '#/shared/ui/FormInput'
import RegisterForm from '#/shared/ui/RegisterForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/signup/')({
  component: RouteComponent,
})

function RouteComponent() {


  return (
    <div className="max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <h2 className="text-center">Please signup</h2>
        <div className="max-w-xs mx-auto py-8">

        </div>

        <RegisterForm />
      </div>
    </div>
  )
}
