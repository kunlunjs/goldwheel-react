import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

function render() {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <App />
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
