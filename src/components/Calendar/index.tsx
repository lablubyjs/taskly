import React, { useState } from 'react'
import { DateMatrix, createDateMatrix } from 'date-matrix'

import ArrowLeft from '../../../public/images/arrow-left.svg'
import ArrowRight from '../../../public/images/arrow-right.svg'

import { Button } from '../Button'

import * as S from './styles'
import { lightTheme, Text } from '@/styles'

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

const incrementWeek = (state: Calendar): Calendar => {
  if (state.maxWeek + state.increment > state.dateMatrix.weeks.length) {
    const newMonth = state.month < 11 ? state.month + 1 : 0
    const newYear = state.month === 11 ? state.year + 1 : state.year

    return {
      month: newMonth,
      year: newYear,
      minWeek: 0,
      maxWeek: state.increment,
      increment: state.increment,
      dateMatrix: createDateMatrix(new Date(newYear, newMonth, 1)),
    }
  }

  return {
    ...state,
    minWeek: state.minWeek + state.increment,
    maxWeek: state.maxWeek + state.increment,
  }
}

const decrementWeek = (state: Calendar): Calendar => {
  if (state.minWeek - state.increment < 0) {
    const newMonth = state.month > 0 ? state.month - 1 : 11
    const newYear = state.month === 0 ? state.year - 1 : state.year
    const newDateMatrix = createDateMatrix(new Date(newYear, newMonth, 1))
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
  const [calendarState, setCalendarState] = useState<Calendar>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    minWeek: 0,
    maxWeek: 2,
    increment: 2,
    dateMatrix: createDateMatrix(new Date()),
  })

  const weeks = calendarState.dateMatrix.weeks.slice(
    calendarState.minWeek,
    calendarState.maxWeek
  )
  const monthName = new Date(
    calendarState.year,
    calendarState.month,
    1
  ).toLocaleDateString('default', { month: 'long' })

  return (
    <S.CalendarContainer>
      <S.CalendarHeader>
        <Text fontSize={1.5} fontWeight="regular">
          {monthName}, {calendarState.year}
        </Text>
        <S.ButtonsContainer>
          <Button
            backgroundColor={lightTheme.buttonControl}
            height={1.25}
            width={1.25}
            borderRadius={'50%'}
            onClick={() => setCalendarState(decrementWeek(calendarState))}
          >
            <ArrowLeft />
          </Button>
          <Button
            backgroundColor={lightTheme.buttonControl}
            height={1.25}
            width={1.25}
            borderRadius={'50%'}
            onClick={() => setCalendarState(incrementWeek(calendarState))}
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
          <option value={1}>Uma Semana</option>
          <option value={2}>Duas Semanas</option>
          <option value={3}>Três Semanas</option>
          <option value={5}>Mês</option>
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
