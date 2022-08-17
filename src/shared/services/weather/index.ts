import axios from 'axios'

import { IWeatherServices } from './interfaces'

import { IWeatherRequest, IWeatherResponse } from '@/shared/interfaces'

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const weatherServices = (): IWeatherServices => {
  async function getWeather(data: IWeatherRequest): Promise<IWeatherResponse> {
    const response = await instance.post(
      `weather?lat=${data.latitude}&lon=${data.longitude}&units=imperial&APPID=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    )
    const weatherData: IWeatherResponse = {
      name: response.data.name,
      temperature: response.data.main.temp.toFixed(1),
      condition: response.data.weather[0].main
    }
    return weatherData
  }

  return { getWeather }
}
