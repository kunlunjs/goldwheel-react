/// <reference types="vitest" />
/// <reference types="vite/client" />

// https://cn.vitejs.dev/guide/env-and-mode.html
interface ImportMetaEnv {
  VITE_PORT?: string
  VITE_API_BASE?: string
  VITE_BUILD_GZIP?: 'true'
  VITE_API_MOCKING?: 'true'
}
