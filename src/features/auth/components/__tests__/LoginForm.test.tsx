import {
  createUser,
  renderApp,
  screen,
  userEvent,
  waitFor
} from '@/test/test-utils'
import { LoginForm } from '../LoginForm'

test('should login new user and call onSuccess cb which should navigate the user to the app', async () => {
  const user = userEvent.setup()
  const newUser = await createUser({ team_id: undefined })

  const onSuccess = vi.fn()

  onSuccess.mockImplementation(() => console.log('called onSuccess'))

  await renderApp(<LoginForm onSuccess={onSuccess} />, { user: null })

  await user.type(screen.getByLabelText(/email address/i), newUser.email)
  await user.type(screen.getByLabelText(/password/i), newUser.password)

  await user.click(screen.getByRole('button', { name: /log in/i }))

  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1))
})
