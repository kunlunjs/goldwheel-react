import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)

beforeAll(() => {
  // Start the interception.
  server.listen()
})

afterEach(() => {
  // Remove any handlers you may have added
  // in individual tests (runtime handlers).
  server.resetHandlers()
})

afterAll(() => {
  // Disable request interception and clean up.
  server.close()
})
