import { StrictMode } from 'react'
import { ConfigProvider } from 'antd'
import { createRoot } from 'react-dom/client'
import App from './App'
import { reportWebVitals } from './reportWebVitals'
// import * as serviceWorker from './serviceWorker'
import './index.css'
import 'antd/dist/reset.css'

// alias createRoot(document.getElementById('root') as HTMLElement)
// or
// alias createRoot(document.getElementById('root')!)
const container = document.getElementById('root')
if (!container) {
  throw new Error('container is null')
}
const root = createRoot(container)

function render() {
  root.render(
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
// NOTE: {"module": "ESNext", target": "ESNext"} support top level `await`
if (import.meta.env.VITE_API_MOCKING === 'true') {
  const { initMocks } = await import('./test/server')
  initMocks().then(() => {
    render()
  })
} else {
  render()
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
