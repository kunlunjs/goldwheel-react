import { message } from 'antd'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import Axios from 'axios'
import { API_BASE } from '@/config'
import NProgress from '@/lib/nprogress'
import { useNotificationStore } from '@/stores/notifications'
import storage from '@/utils/storage'
import { AxiosCanceler } from './requestCancel'

const cancelRequest = new AxiosCanceler()

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getToken()
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`) // `Bearer ${token}`
  }

  return config
}

export const axios = Axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
})

axios.interceptors.request.use(config => {
  NProgress.start()
  cancelRequest.addPending(config)
  return config
})

axios.interceptors.request.use(authRequestInterceptor)

axios.interceptors.response.use(
  response => {
    NProgress.done()
    cancelRequest.removePending(response.config)
    /**
     * TODO: global loading, custom error handling
     */
    return response.data
  },
  (error: AxiosError) => {
    NProgress.done()
    // const message = error.message // error.response?.data?.message || error.message
    if (error.message.match(/timeout/)) {
      message.warning('request timeout')
    }
    useNotificationStore.getState().addNotification({
      type: 'error',
      title: 'Error',
      message: error.message
    })
    if (!window.navigator.onLine) {
      window.location.href = '/app'
    }
    return Promise.reject(error)
  }
)
