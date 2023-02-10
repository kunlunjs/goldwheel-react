import type { AxiosHeaders, AxiosRequestConfig } from 'axios'
import Axios from 'axios'
import { API_URL } from '@/config'
import { useNotificationStore } from '@/stores/notifications'
import storage from '@/utils/storage'

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken()
  if (token) {
    ;(config.headers as AxiosHeaders).set('authorization', `${token}`)
  }

  return config
}

export const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
// @ts-ignore
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
