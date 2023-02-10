export const initMocks = async () => {
  if (import.meta.env.VITE_API_MOCKING === 'true') {
    if (typeof window === 'undefined') {
      console.log('Mocking server in server')
      const { server } = await import('./server')
      server.listen()
    } else {
      console.log('Mocking server in client')
      const { worker } = await import('./browser')
      worker.start({
        onUnhandledRequest: ({ headers, method, url }, print) => {
          // if (url.pathname.startsWith('/src')) {
          //   return 'bypass'
          // }
          if (!url.pathname.startsWith('/api')) {
            throw new Error(`Unhandled request to ${method} ${url}`)
          }
        }
      })
    }
  }
}
