import '../src/index.css'

/**
 * @types
 */
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  options: {
    storySort: (a, b) => {
      return a[1].kind === b[1].kind
        ? a[1].name.length - b[1].name.length // 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })
    }
  }
}

export const decorators = []
