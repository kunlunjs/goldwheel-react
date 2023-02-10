import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initMocks } from './test/server'
import './index.css'

initMocks().then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
})
