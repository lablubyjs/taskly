import { ICalendar } from '@/shared/interfaces'
import { createDateMatrix } from 'date-matrix'

export const decrementWeek = (
  state: ICalendar,
  matrixOptions: object
): ICalendar => {
  if (state.minWeek - state.increment < 0) {
    const newMonth = state.month > 0 ? state.month - 1 : 11
    const newYear = state.month === 0 ? state.year - 1 : state.year
    const newDateMatrix = createDateMatrix(
      new Date(newYear, newMonth, 1),
      matrixOptions
    )
    const monthLength = newDateMatrix.weeks.length

    return {
      month: newMonth,
      year: newYear,
      minWeek: monthLength - state.increment,
      maxWeek: monthLength,
      increment: state.increment,
      dateMatrix: newDateMatrix,
    }
  }

  return {
    ...state,
    minWeek: state.minWeek - state.increment,
    maxWeek: state.maxWeek - state.increment,
  }
}
