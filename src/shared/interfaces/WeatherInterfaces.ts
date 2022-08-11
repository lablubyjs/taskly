export interface IWeatherRequest {
  city: string
  days: string
}

export interface IWeatherResponse {
  last_updated_epoch: number
  last_updated: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: ICondition
}

export interface ICondition {
  text: string
  icon: string
  code: number
}
