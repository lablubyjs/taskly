import React, { useState, useEffect } from 'react'

import { useAppSelector } from '@/hooks'

import { weatherServices } from '@/shared/services'

import { selectSettingsTheme } from '@/store/slices'

import { Card, Text } from '@/styles'
import * as S from './styles'

export const WeatherWidget = ({ city, days, title }: WeatherWidget.Props) => {
  const [weather, setWeather] = useState<any>({})
  const theme = useAppSelector(selectSettingsTheme)

  const { getWeather } = weatherServices()

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await getWeather({ city, days })
        setWeather({
          temperature: response.temp_c + 'º C',
          condition: response.condition.text,
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchWeather()
  }, [city, days])

  return (
    <Card backgroundColor={theme.buttonTask} borderRadius="20px" width="90%">
      <S.WeatherWidgetWrapper>
        <Text fontSize={1.3} fontWeight="400">
          {title}
        </Text>
        <Text fontSize={3} fontWeight="400" color={theme.textLight}>
          {weather.temperature}
        </Text>
        <Text fontSize={1.3} fontWeight="700">
          {weather.condition}
        </Text>
      </S.WeatherWidgetWrapper>
    </Card>
  )
}

namespace WeatherWidget {
  export type Props = {
    city: string
    days: string
    title: string
  }
}
