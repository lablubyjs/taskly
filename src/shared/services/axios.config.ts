import axios, { AxiosError } from 'axios'

export const instance = axios.create({
  baseURL: process.env.API_URL,
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
