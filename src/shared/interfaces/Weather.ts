export interface IWeatherRequest {
  latitude: string
  longitude: String
}

export interface IWeatherResponse {
  name: string
  condition: string
  temperature: number
}