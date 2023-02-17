import type { InternalAxiosRequestConfig } from 'axios'
import Axios from 'axios'
import { API_BASE } from '@/config'
import { useNotificationStore } from '@/stores/notifications'
import storage from '@/utils/storage'

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getToken()
  if (token) {
    config.headers.set('authorization', `${token}`)
  }

  return config
}

export const axios = Axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
})
axios.interceptors.request.use(authRequestInterceptor)
axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    const message = error.response?.data?.message || error.message
    useNotificationStore.getState().addNotification({
      type: 'error',
      title: 'Error',
      message
    })

    return Promise.reject(error)
  }
)
