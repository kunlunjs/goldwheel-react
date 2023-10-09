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
        '@foxglove': path.resolve(__dirname, 'packages'),
        /**
         * @see https://github.com/vitejs/vite/discussions/8799
         */
        'http': 'rollup-plugin-node-polyfills/polyfills/http',
        'https': 'rollup-plugin-node-polyfills/polyfills/http',
        'zlib': 'rollup-plugin-node-polyfills/polyfills/zlib',
        'stream': 'rollup-plugin-node-polyfills/polyfills/stream',
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
            title: 'Gold Wheel React App'
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
          threshold: 10240,
          algorithm: 'gzip',
          deleteOriginFile: false
        })
      // env.VITE_ESLINT_ENABLE === 'true' && eslintPlugin()
      // FIXME
      // visualizer({ emitFile: true }) as PluginOption
    ],
    server: {
      // host: '0.0.0.0',
      port: Number.isNaN(parseInt(env.VITE_PORT))
        ? 3000
        : parseInt(env.VITE_PORT),
      open: true,
      cors: true
      // proxy: {
      //   '/api': {
      //     target:
      //       env.VITE_API_MOCKING === 'true' ? undefined : env.VITE_API_MOCKING,
      //     changeOrigin: true
      //     // rewrite: path => path.replace(/^\/api/, '')
      //   }
      // }
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
          chunkFileNames: 'chunks/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        },
        // MODULE_LEVEL_DIRECTIVE: WARN  Module level directives cause errors when bundled, "use client" in "node_modules/.pnpm/@tanstack+react-query@4.29.3_react-dom@18.2.0_react@18.2.0/node_modules/@tanstack/react-query/build/lib/useSyncExternalStore.mjs" was ignored.
        // EVAL: node_modules/.pnpm/google-protobuf@3.21.2/node_modules/google-protobuf/google-protobuf.js (27:206) Use of eval in "node_modules/.pnpm/google-protobuf@3.21.2/node_modules/google-protobuf/google-protobuf.js" is strongly discouraged as it poses security risks and may cause issues with minification.
        onwarn(warning, warn) {
          if (
            warning.code === 'MODULE_LEVEL_DIRECTIVE' ||
            warning.code === 'EVAL'
          )
            return
          warn(warning)
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
