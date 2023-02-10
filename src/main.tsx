import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initMocks } from './test/server'
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
import.meta.env.DEV
  ? initMocks().then(() => {
      render()
    })
  : render()
