import React, { useState } from 'react'
import { createDateMatrix } from 'date-matrix'

import ArrowLeft from '@/images/arrow-left.svg'
import ArrowRight from '@/images/arrow-right.svg'

import { Button } from '@/components/Button'

import { useAppSelector } from '@/hooks'

import { selectSettingsTheme } from '@/store/slices'

import { ICalendar } from '@/shared/interfaces'
import {
  changeIncrement,
  incrementWeek,
  decrementWeek,
  sliceDateMatrix,
  dateToLocaleString,
} from '@/shared/utils'

import { Text } from '@/styles'
import * as S from './styles'

export const Calendar = () => {
  const theme = useAppSelector(selectSettingsTheme)
  const dateMatrixOptions = { locale: 'en-US' }
  const [calendarState, setCalendarState] = useState<ICalendar>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    minWeek: 0,
    maxWeek: 5,
    increment: 5,
    dateMatrix: createDateMatrix(new Date(), dateMatrixOptions),
  })

  const weeks = sliceDateMatrix(
    calendarState.dateMatrix,
    calendarState.minWeek,
    calendarState.maxWeek
  )

  const monthName = dateToLocaleString(
    new Date(calendarState.year, calendarState.month, 1),
    'en-US',
    { month: 'long' }
  )

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
            onClick={() =>
              setCalendarState(decrementWeek(calendarState, dateMatrixOptions))
            }
          >
            <ArrowLeft />
          </Button>
          <Button
            backgroundColor={theme.buttonControl}
            height={1.25}
            width={'1.25rem'}
            borderRadius={'50%'}
            onClick={() =>
              setCalendarState(incrementWeek(calendarState, dateMatrixOptions))
            }
          >
            <ArrowRight />
          </Button>
        </S.ButtonsContainer>
        <S.SelectMode
          defaultValue={5}
          onChange={(e) =>
            setCalendarState(changeIncrement(calendarState, +e.target.value))
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
              {week.map((day) =>
                day.date.toString() === new Date().toString() ? (
                  <td className="today" key={day.day}>
                    {day.day}
                  </td>
                ) : (
                  <td key={day.day}>{day.day}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </S.CalendarBody>
    </S.CalendarContainer>
  )
}
