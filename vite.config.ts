/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'path'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import type { PluginOption } from 'vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), visualizer({ emitFile: true }) as PluginOption],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // https://github.com/vitejs/vite/discussions/8799
      'timers': 'rollup-plugin-node-polyfills/polyfills/timers'
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts'
  }
})
