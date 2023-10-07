import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Toastify = () => {
  return (
    <ToastContainer
      position="top-right"
      draggable
      rtl={false}
      theme="dark"
      pauseOnHover
      closeOnClick
      pauseOnFocusLoss
      autoClose={5000}
      newestOnTop={false}
      hideProgressBar={false}
    />
  )
}
