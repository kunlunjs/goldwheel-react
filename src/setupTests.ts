// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
// import '@testing-library/jest-dom/extend-expect'
// import {
//   setupIntersectionMocking,
//   resetIntersectionMocking
// } from 'react-intersection-observer/test-utils'
import { queryClient } from '@/lib/react-query'
import { resetDb } from '@/test/server/db'
import { server } from '@/test/server/server'

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error'
  })
  // NOTE: fix Error: Uncaught [ReferenceError: ResizeObserver is not defined]
  global.ResizeObserver = class ResizeObserver {
    observe() {
      // do nothing
    }
    unobserve() {
      // do nothing
    }
    disconnect() {
      // do nothing
    }
  }
})
// TODO
// beforeEach(() => {
//   setupIntersectionMocking(vi.fn())
// })

afterAll(() => server.close())
afterEach(() => {
  // resetIntersectionMocking()
  server.resetHandlers()
})

// general cleanup
afterEach(async () => {
  queryClient.clear()
  resetDb()
})
