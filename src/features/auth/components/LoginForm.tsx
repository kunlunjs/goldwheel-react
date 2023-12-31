import { Link } from 'react-router-dom'
import * as z from 'zod'
import { Button } from '@/components/Elements'
import { Form, InputField } from '@/components/Form'
import { useLogin } from '@/lib/auth'

const schema = z.object({
  email: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required')
})

type LoginValues = {
  email: string
  password: string
}

type LoginFormProps = {
  onSuccess: () => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin()

  return (
    <div>
      <Form<LoginValues>
        schema={schema}
        onSubmit={async values => {
          await login.mutateAsync(values)
          onSuccess()
        }}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="email"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <InputField
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <div>
              <Button
                isLoading={login.isPending}
                type="submit"
                className="w-full"
              >
                Log in
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link
            to="../register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
