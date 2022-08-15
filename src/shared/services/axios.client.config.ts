import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'

export const getApiClient = (context: any) => {
  const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
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
