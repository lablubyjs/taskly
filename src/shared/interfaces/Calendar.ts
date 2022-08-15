import { DateMatrix } from 'date-matrix'

export interface ICalendar {
  month: number
  year: number
  minWeek: number
  maxWeek: number
  increment: number
  dateMatrix: DateMatrix
}
