import { StrictMode } from 'react'
import { ConfigProvider } from 'antd'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import 'antd/dist/reset.css'

function render() {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00b96b'
          }
        }}
      >
        <App />
      </ConfigProvider>
    </StrictMode>
  )
}

/**
 * @see https://cn.vitejs.dev/guide/env-and-mode.html
 */
// TODO: support top level `await`
;(async () => {
  if (import.meta.env.DEV) {
    const { initMocks } = await import('./test/server')
    initMocks().then(() => {
      render()
    })
  } else {
    render()
  }
})()
