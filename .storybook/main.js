const path = require('path')
const fs = require('fs')

// [Workaround] This logic means `"../packages/components/*/stories/*.stories.tsx"` but it's much faster.
function getStories({ pkg, dir = 'components' }) {
  const dirName = `src/${dir}`
  /**
   * @type {string[]} scope
   */
  const scope = pkg ? [pkg] : fs.readdirSync(dirName)
  return scope
    .map(pkg => `${dirName}/${pkg}`)
    .filter(storyDir => fs.existsSync(storyDir))
    .map(storyDir => `../${storyDir}/*.stories.tsx`)
}

module.exports = {
  core: {
    builder: '@storybook/builder-webpack5',
    disableTelemetry: true
  },
  stories: [...getStories({ dir: 'components' })],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
    '@storybook/addon-interactions'
  ],
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src')
    }
    config.resolve.extensions.push('.ts', '.tsx')
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            implementation: require.resolve('postcss')
          }
        }
      ],
      include: path.resolve(__dirname, '../')
    })
    return config
  },
  typescript: {
    reactDocgen: false
  }
}
