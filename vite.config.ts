/// <reference types="vitest" />

import path from 'path'
import reactPlugin from '@vitejs/plugin-react'
// import { visualizer } from 'rollup-plugin-visualizer'
import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv, defineConfig } from 'vite'
import compressionPlugin from 'vite-plugin-compression'
// import eslintPlugin from 'vite-plugin-eslint'
import { createHtmlPlugin } from 'vite-plugin-html'
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig((mode: ConfigEnv): UserConfig => {
  // all .env.development/.env.production/.env will be loaded
  const env = loadEnv(mode.mode, process.cwd())

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        // https://github.com/vitejs/vite/discussions/8799
        'timers': 'rollup-plugin-node-polyfills/polyfills/timers'
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
          // modifyVars: {
          // 	"primary-color": "#1DA57A",
          // },
          // additionalData: `@import "@/styles/var.less";`
        }
      }
    },
    plugins: [
      reactPlugin(),
      createHtmlPlugin({
        inject: {
          data: {
            /* index.html <title><%- title %></title>*/
            title: 'Universe React App'
          }
        }
      }),
      // createSvgIconsPlugin({
      //   iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      //   symbolId: 'icon-[dir]-[name]'
      // }),
      env.VITE_BUILD_GZIP === 'true' &&
        compressionPlugin({
          ext: '.gz',
          disable: false,
          algorithm: 'gzip',
          deleteOriginFile: false,
          threshold: 10240
        })
      // eslintPlugin()
      // FIXME
      // visualizer({ emitFile: true }) as PluginOption
    ],
    server: {
      // host: '0.0.0.0',
      port: Number.isNaN(parseInt(env.VITE_PORT))
        ? 3000
        : parseInt(env.VITE_PORT),
      open: true,
      cors: true,
      proxy: {
        '/api': {
          target:
            env.VITE_API_MOCKING === 'true' ? undefined : env.VITE_API_MOCKING,
          changeOrigin: true
          // rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    esbuild: {
      pure: mode.mode === 'production' ? ['console.log', 'debugger'] : []
    },
    build: {
      outDir: 'dist',
      minify: 'esbuild', // 'terser'
      chunkSizeWarningLimit: 1024,
      rollupOptions: {
        output: {
          // TODO: optimization
          // manualChunks: {
          //   lodash: ['lodash'],
          //   react: [
          //     'react',
          //     'react-dom',
          //     'react-router-dom',
          //     '@tanstack/react-query',
          //     '@tanstack/react-query-devtools',
          //     'react-error-boundary',
          //     'react-helmet-async',
          //     'react-query-auth',
          //     'react-hook-form',
          //     'react-i18next',
          //     'ahooks'
          //   ]
          // },
          // manualChunks(id) {
          //   if (id.includes('node_modules')) {
          //     return 'vendor'
          //   }
          // },
          chunkFileNames: 'chunks/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    // required /// <reference types="vitest" />
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts'
    }
  }
})
