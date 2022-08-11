import axios from 'axios'

import { IWeatherServices } from './interfaces'

import { IWeatherRequest, IWeatherResponse } from '@/shared/interfaces'

const instance = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const weatherServices = (): IWeatherServices => {
  async function getWeather(data: IWeatherRequest): Promise<IWeatherResponse> {
    const response = await instance.post(
      `forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${data.city}&days=${data.city}&aqi=no&alerts=no`
    )
    return response.data.current
  }

  return { getWeather }
}
