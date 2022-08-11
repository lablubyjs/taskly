import React, { useEffect, useState } from 'react'

import Person from '@/images/person.svg'
import Play from '@/images/play.svg'
import Pause from '@/images/pause.svg'

import { Button } from '@/components'

import { useAppSelector } from '@/hooks'

import {
  selectSettingsPomodoroTimer,
  selectSettingsTheme,
} from '@/store/slices'

import { Card, Text } from '@/styles'
import * as S from './styles'

function calculateTimeInSeconds(timeInSeconds: number): (number | string)[] {
  let hours: number = Math.floor(timeInSeconds / 3600)
  let minutes: number = Math.floor((timeInSeconds - hours * 3600) / 60)
  let seconds: number = timeInSeconds - hours * 3600 - minutes * 60

  return [
    hours < 10 ? `0${hours}` : hours,
    minutes < 10 ? `0${minutes}` : minutes,
    seconds < 10 ? `0${seconds}` : seconds,
  ]
}

export const PomodoroTimerWidget = () => {
  const theme = useAppSelector(selectSettingsTheme)
  const pomodoroTimer = useAppSelector(selectSettingsPomodoroTimer)

  const [timeInSeconds, setTimeInSeconds] = useState(pomodoroTimer)
  const [timeArray, setTimeArray] = useState<Array<number | string>>([])
  const [isPlayed, setIsPlayed] = useState<boolean>(false)
  const [intervalId, setIntervalId] = useState<number>(0)

  const [hour, minutes, seconds] = timeArray

  useEffect(() => {
    setTimeArray(calculateTimeInSeconds(timeInSeconds))
  }, [timeInSeconds])

  const handlePlayButton = () => {
    setIsPlayed(true)
    const interval: any = setInterval(() => {
      setTimeInSeconds((previousState: number) => previousState - 1)
    }, 1000)

    setIntervalId(interval)
  }

  const handleStopButton = () => {
    setIsPlayed(false)
    clearInterval(intervalId)
  }

  const handleReset = () => {
    clearInterval(intervalId)
    setTimeInSeconds(0)
  }

  return (
    <Card
      backgroundColor={theme.buttonTask}
      borderRadius="20px"
      width="90%"
      height="50%"
    >
      <S.StopwatchContainer>
        <Text fontSize={1} fontWeight="700" color={theme.textLight}>
          Pomodoro Timer
        </Text>
        <Text fontSize={2} fontWeight="700" color={theme.textDark}>
          {hour}:{minutes}:{seconds}
        </Text>
        <div>
          <Person />
          <Button
            backgroundColor={theme.buttonDone}
            height={3.5}
            width={'3.5rem'}
            borderRadius={'12.5px'}
            onClick={isPlayed ? handleStopButton : handlePlayButton}
          >
            {isPlayed ? <Pause /> : <Play />}
          </Button>
        </div>
      </S.StopwatchContainer>
    </Card>
  )
}
