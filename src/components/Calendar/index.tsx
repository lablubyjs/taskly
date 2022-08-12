import React, { useState } from 'react'
import { DateMatrix, createDateMatrix } from 'date-matrix'

import ArrowLeft from '@/images/arrow-left.svg'
import ArrowRight from '@/images/arrow-right.svg'

import { Button } from '@/components/Button'

import { useAppSelector } from '@/hooks'

import { selectSettingsTheme } from '@/store/slices'

import { Text } from '@/styles'
import * as S from './styles'

interface Calendar {
  month: number
  year: number
  minWeek: number
  maxWeek: number
  increment: number
  dateMatrix: DateMatrix
}

const changeIncrement = (value: number, state: Calendar): Calendar => {
  return {
    ...state,
    minWeek: 0,
    maxWeek: value,
    increment: value,
  }
}

const incrementWeek = (state: Calendar, matrixOptions: object): Calendar => {
  if (state.maxWeek + state.increment > state.dateMatrix.weeks.length) {
    const newMonth = state.month < 11 ? state.month + 1 : 0
    const newYear = state.month === 11 ? state.year + 1 : state.year

    return {
      month: newMonth,
      year: newYear,
      minWeek: 0,
      maxWeek: state.increment,
      increment: state.increment,
      dateMatrix: createDateMatrix(new Date(newYear, newMonth, 1), matrixOptions),
    }
  }

  return {
    ...state,
    minWeek: state.minWeek + state.increment,
    maxWeek: state.maxWeek + state.increment,
  }
}

const decrementWeek = (state: Calendar,  matrixOptions: object): Calendar => {
  if (state.minWeek - state.increment < 0) {
    const newMonth = state.month > 0 ? state.month - 1 : 11
    const newYear = state.month === 0 ? state.year - 1 : state.year
    const newDateMatrix = createDateMatrix(new Date(newYear, newMonth, 1), matrixOptions)
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

export const Calendar = () => {
  const theme = useAppSelector(selectSettingsTheme)
  const dateMatrixOptions = {locale: 'en-US'}
  const [calendarState, setCalendarState] = useState<Calendar>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    minWeek: 0,
    maxWeek: 2,
    increment: 2,
    dateMatrix: createDateMatrix(new Date(), dateMatrixOptions),
  })

  const weeks = calendarState.dateMatrix.weeks.slice(
    calendarState.minWeek,
    calendarState.maxWeek
  )
  const monthName = new Date(
    calendarState.year,
    calendarState.month,
    1
  ).toLocaleDateString('en-US', { month: 'long' })

  return (
    <S.CalendarContainer>
      <S.CalendarHeader>
        <Text fontSize={1.5} fontWeight="regular">
          {monthName}, {calendarState.year}
        </Text>
        <S.ButtonsContainer>
          <Button
            backgroundColor={theme.buttonControl}
            height={1.25}
            width={'1.25rem'}
            borderRadius={'50%'}
            onClick={() => setCalendarState(decrementWeek(calendarState, dateMatrixOptions))}
          >
            <ArrowLeft />
          </Button>
          <Button
            backgroundColor={theme.buttonControl}
            height={1.25}
            width={'1.25rem'}
            borderRadius={'50%'}
            onClick={() => setCalendarState(incrementWeek(calendarState, dateMatrixOptions))}
          >
            <ArrowRight />
          </Button>
        </S.ButtonsContainer>
        <S.SelectMode
          defaultValue={2}
          onChange={(e) =>
            setCalendarState(changeIncrement(+e.target.value, calendarState))
          }
        >
          <option value={1}>One Week</option>
          <option value={2}>Two Weeks</option>
          <option value={3}>Three Weeks</option>
          <option value={5}>Month</option>
        </S.SelectMode>
      </S.CalendarHeader>
      <S.CalendarBody>
        <thead>
          <tr>
            {calendarState.dateMatrix.weekdays.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, index) => (
            <tr key={index}>
              {week.map((day) => {
                if (day.date.toString() === new Date().toString()) {
                  return (
                    <td className="today" key={day.day}>
                      {day.day}
                    </td>
                  )
                }
                return <td key={day.day}>{day.day}</td>
              })}
            </tr>
          ))}
        </tbody>
      </S.CalendarBody>
    </S.CalendarContainer>
  )
}
