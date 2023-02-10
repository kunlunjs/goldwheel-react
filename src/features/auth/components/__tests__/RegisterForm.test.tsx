import { userGenerator } from '@/test/data-generators'
import { renderApp, screen, userEvent, waitFor } from '@/test/test-utils'

import { RegisterForm } from '../RegisterForm'

test('should register new user and call onSuccess cb which should navigate the user to the app', async () => {
  const newUser = userGenerator({})

  const onSuccess = vi.fn()

  await renderApp(<RegisterForm onSuccess={onSuccess} />, { user: null })

  await userEvent.type(screen.getByLabelText(/first name/i), newUser.first_name)
  await userEvent.type(screen.getByLabelText(/last name/i), newUser.last_name)
  await userEvent.type(screen.getByLabelText(/email address/i), newUser.email)
  await userEvent.type(screen.getByLabelText(/password/i), newUser.password)
  await userEvent.type(screen.getByLabelText(/team name/i), newUser.team_name)

  await userEvent.click(screen.getByRole('button', { name: /register/i }))

  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1))
})
