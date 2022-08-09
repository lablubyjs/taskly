import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'

export const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.response.use(
  async (response) => {
    return response.data
  },

  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

instance.interceptors.request.use(
  async (config) => {
    const { token } = parseCookies()

    if (token) {
      config.headers!.Authorization = `Bearer ${token}`
    }

    return config
  },

  (error: AxiosError) => {
    return Promise.reject(error)
  }
)
