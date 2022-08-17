import React, { useState, useMemo } from 'react'

import { useAppSelector, useGeoLocation } from '@/hooks'

import { weatherServices } from '@/shared/services'

import { selectSettingsTheme } from '@/store/slices'

import { Card, Text } from '@/styles'
import * as S from './styles'

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<any>({})
  const theme = useAppSelector(selectSettingsTheme)
  const { loaded, coordinates, error } = useGeoLocation()

  const { getWeather } = weatherServices()

  useMemo(async () => {
    try {
      if (coordinates) {
        const { latitude, longitude } = coordinates
        const response = await getWeather({ latitude, longitude })
        setWeather({
          city: response.name,
          temperature: response.temperature + 'º',
          condition: response.condition,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }, [coordinates])

  if (!loaded) {
    return (
      <Card
        backgroundColor={theme.buttonTask}
        borderRadius="20px"
        width="90%"
        height="25vh"
      >
        <S.WeatherWidgetWrapper>
          <Text fontSize={2} fontWeight="400" color={theme.textLight}>
            Fetching data
          </Text>
        </S.WeatherWidgetWrapper>
      </Card>
    )
  }

  if (loaded && error) {
    return (
      <Card
        backgroundColor={theme.buttonTask}
        borderRadius="20px"
        width="90%"
        height="25vh"
      >
        <S.WeatherWidgetWrapper>
          <Text fontSize={1.5} fontWeight="400" color={theme.textLight}>
            Weather information could not be found!
          </Text>
        </S.WeatherWidgetWrapper>
      </Card>
    )
  }

  return (
    <Card backgroundColor={theme.buttonTask} borderRadius="20px" width="90%">
      <S.WeatherWidgetWrapper>
        <Text fontSize={1.3} fontWeight="400">
          {weather.city}
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
