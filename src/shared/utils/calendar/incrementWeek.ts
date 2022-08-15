import { createDateMatrix } from 'date-matrix'

import { ICalendar } from '@/shared/interfaces'

export const incrementWeek = (
  state: ICalendar,
  matrixOptions: object
): ICalendar => {
  if (state.maxWeek + state.increment > state.dateMatrix.weeks.length) {
    const newMonth = state.month < 11 ? state.month + 1 : 0
    const newYear = state.month === 11 ? state.year + 1 : state.year

    return {
      month: newMonth,
      year: newYear,
      minWeek: 0,
      maxWeek: state.increment,
      increment: state.increment,
      dateMatrix: createDateMatrix(
        new Date(newYear, newMonth, 1),
        matrixOptions
      ),
    }
  }

  return {
    ...state,
    minWeek: state.minWeek + state.increment,
    maxWeek: state.maxWeek + state.increment,
  }
}
