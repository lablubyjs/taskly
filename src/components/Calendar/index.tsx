import React, { useState } from 'react'
import * as S from './styles'

interface Calendar {
  month: string
  year: number
  mode: number
}

export const Calendar = () => {
  const [calendarState, setCalendarState] = useState<Calendar>({
    month: new Date().toLocaleString('default', { month: 'long' }),
    year: new Date().getFullYear(),
    mode: 2
  })

  return (
    <S.Title>{calendarState.month}, {calendarState.year}</S.Title>
  )
}