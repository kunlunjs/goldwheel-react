import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { Link } from 'react-router-dom'
import * as z from 'zod'
import { Button } from '@/components/Elements'
import { Form, InputField, SelectField } from '@/components/Form'
import { useTeams } from '@/features/teams'
import { useRegister } from '@/lib/auth'

const schema = z
  .object({
    email: z.string().min(1, 'Required'),
    first_name: z.string().min(1, 'Required'),
    last_name: z.string().min(1, 'Required'),
    password: z.string().min(1, 'Required')
  })
  .and(
    z
      .object({
        team_id: z.string().min(1, 'Required')
      })
      .or(z.object({ team_name: z.string().min(1, 'Required') }))
  )

type RegisterValues = {
  first_name: string
  last_name: string
  email: string
  password: string
  team_id?: string
  team_name?: string
}

type RegisterFormProps = {
  onSuccess: () => void
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const registerMutation = useRegister()
  const [chooseTeam, setChooseTeam] = useState(false)

  const teamsQuery = useTeams({
    config: {
      enabled: chooseTeam
    }
  })

  return (
    <div>
      <Form<RegisterValues, typeof schema>
        onSubmit={async values => {
          await registerMutation.mutate(values)
          onSuccess()
        }}
        schema={schema}
        options={{
          shouldUnregister: true
        }}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="text"
              label="First Name"
              error={formState.errors['first_name']}
              registration={register('first_name')}
            />
            <InputField
              type="text"
              label="Last Name"
              error={formState.errors['last_name']}
              registration={register('last_name')}
            />
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

            <Switch.Group>
              <div className="flex items-center">
                <Switch
                  checked={chooseTeam}
                  onChange={setChooseTeam}
                  className={`${
                    chooseTeam ? 'bg-blue-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      chooseTeam ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
                <Switch.Label className="ml-4">Join Existing Team</Switch.Label>
              </div>
            </Switch.Group>

            {chooseTeam && teamsQuery.data ? (
              <SelectField
                label="Team"
                error={formState.errors['team_id']}
                registration={register('team_id')}
                options={teamsQuery?.data?.map(team => ({
                  label: team.name,
                  value: team.id
                }))}
              />
            ) : (
              <InputField
                type="text"
                label="Team Name"
                error={formState.errors['team_name']}
                registration={register('team_name')}
              />
            )}
            <div>
              <Button
                isLoading={registerMutation.isLoading}
                type="submit"
                className="w-full"
              >
                Register
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link
            to="../login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  )
}
