import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // baseUrl: 'http://localhost:6006/',
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config)
    }
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite'
    }
  }
})
