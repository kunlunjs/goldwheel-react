export const initMocks = async () => {
  if (import.meta.env.VITE_API_MOCKING === 'true') {
    if (typeof window === 'undefined') {
      // FIXME: pnpm build https://github.com/mswjs/msw/issues/1800
      // console.log('Mocking server in server')
      // const { server } = await import('./server')
      // server.listen()
    } else {
      console.log('Mocking server in browser')
      const { worker } = await import('./browser')
      worker.start({
        onUnhandledRequest: ({ headers, method, url }, print) => {
          // NOTE: 可以对请求进行过滤，不需要 mock 的请求直接 bypass
          // if (url.pathname.startsWith('/src')) {
          //   return 'bypass'
          // }
          // if (!url.pathname.startsWith('/api')) {
          //   throw new Error(`Unhandled request to ${method} ${url}`)
          // }
        }
      })
    }
  }
}
