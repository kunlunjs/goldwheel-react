import { userGenerator } from '@/test/data-generators'
import { renderApp, screen, userEvent, waitFor } from '@/test/test-utils'
import { RegisterForm } from '../RegisterForm'

test('should register new user and call onSuccess cb which should navigate the user to the app', async () => {
  const user = userEvent.setup()
  const newUser = userGenerator({})

  const onSuccess = vi.fn() // jest.fn() if you are using jest.

  await renderApp(<RegisterForm onSuccess={onSuccess} />, { user: null })

  await user.type(screen.getByLabelText(/first name/i), newUser.first_name)
  await user.type(screen.getByLabelText(/last name/i), newUser.last_name)
  await user.type(screen.getByLabelText(/email address/i), newUser.email)
  await user.type(screen.getByLabelText(/password/i), newUser.password)
  await user.type(screen.getByLabelText(/team name/i), newUser.team_name)

  await user.click(screen.getByRole('button', { name: /register/i }))

  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1))
})
