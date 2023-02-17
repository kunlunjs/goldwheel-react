import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  speed: 500,
  minimum: 0.3,
  easing: 'ease',
  showSpinner: true,
  trickleSpeed: 200
})

export default NProgress
