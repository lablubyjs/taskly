import { IWeatherRequest, IWeatherResponse } from '@/shared/interfaces'

export interface IWeatherServices {
  getWeather: (data: IWeatherRequest) => Promise<IWeatherResponse>;
}
