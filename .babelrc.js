// https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#modern-browser-support
module.exports = {
  sourceType: 'unambiguous',
  presets: [
    [
      '@babel/preset-env',
      {
        shippedProposals: true,
        useBuiltIns: 'usage',
        corejs: '3',
        modules: false,
        targets: {
          chrome: 100,
          safari: 15,
          firefox: 91
        }
      }
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ],
  plugins: []
}
