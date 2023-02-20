const fs = require('fs')
const path = require('path')
// const { mergeConfig } = require('vite')

// [Workaround] This logic means `"../packages/components/*/stories/*.stories.tsx"` but it's much faster.
function getStories({ pkg, dir = 'components' }) {
  const dirName = `src/${dir}`
  /**
   * @type {string[]} scope
   */
  const scope = pkg ? [pkg] : fs.readdirSync(dirName)
  const stories = scope
    .map(item => `${dirName}/${item}`)
    .filter(storyDir => fs.existsSync(storyDir))
    .map(storyDir => `../${storyDir}/**/*.stories.tsx`)
  return stories
}

module.exports = {
  core: {
    builder: '@storybook/builder-webpack5', // @storybook/builder-vite
    disableTelemetry: true
  },
  stories: [...getStories({ dir: 'components' })],
  framework: '@storybook/react',
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false
      }
    },
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          // test: [/\.stories\.jsx?$/], This is default
          include: [path.resolve(__dirname, '../src')] // You can specify directories
        },
        loaderOptions: {
          injectStoryParameters: false,
          prettierConfig: { printWidth: 80, singleQuote: false }
        }
      }
    },
    '@storybook/addon-interactions'
    // {
    //   name: '@storybook/addon-docs',
    //   options: {
    //     sourceLoaderOptions: {
    //       injectStoryParameters: false
    //     }
    //   }
    // }
    // 'storybook-addon-code-editor'
  ],
  // adapter @storybook/builder-vite
  // async viteFinal(config) {
  //   return mergeConfig(config, {
  //     resolve: {
  //       alias: {
  //         '@': path.resolve(__dirname, '../src')
  //       }
  //     }
  //   })
  // },
  // adapter @storybook/builder-webpack5
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
