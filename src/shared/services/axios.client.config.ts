import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'

export const getApiClient = (context: any) => {
  const instance = axios.create({
    baseURL: 'https://taskly-ki5crtfs3-taskly.vercel.app/api',
    headers: {
      'Content-Type': 'application/json',
    },
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
      const { accessToken } = parseCookies(context)

      if (accessToken) {
        config.headers!.Authorization = `Bearer ${accessToken}`
      }

      return config
    },

    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  return instance
}
