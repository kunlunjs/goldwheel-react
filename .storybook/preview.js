import '../src/index.css'

/**
 * @type { import('@storybook/react').Preview }
 * https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#from-version-65x-to-700
 */
export const parameters = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' }
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  options: {
    // v6-style sort
    // storySort: (a, b) => {
    //   return a[1].kind === b[1].kind
    //     ? a[1].name.length - b[1].name.length // 0
    //     : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })
    // }
    // v7-style sort
    storySort: (a, b) => {
      return a.title === b.title
        ? 0
        : a.id.localeCompare(b.id, undefined, { numeric: true })
    }
  }
}

export const decorators = []
