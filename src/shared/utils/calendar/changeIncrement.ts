import { ICalendar } from '@/shared/interfaces'

export const changeIncrement = (state: ICalendar, value: number): ICalendar => {
  return {
    ...state,
    minWeek: 0,
    maxWeek: value,
    increment: value,
  }
}
