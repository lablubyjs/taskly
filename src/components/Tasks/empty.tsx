import React from 'react'
import { useRouter } from 'next/router'

import { Button } from '@/components/Button'

import { useAppSelector } from '@/hooks'

import { selectSettingsTheme } from '@/store/slices'

import { Text } from '@/styles'
import * as S from './styles'

const EmptyTasksList = () => {
  const theme = useAppSelector(selectSettingsTheme)
  const router = useRouter()

  return (
    <S.EmptyTasksListContainer>
      <Text
        fontSize={1.5}
        fontWeight="700"
        color={theme.textDark}
        align="center"
      >
        Good job! There are no tasks for today
      </Text>
      <Button
        backgroundColor="transparent"
        height={2}
        width={'auto'}
        onClick={() => router.push('/tasks/create')}
      >
        <Text fontSize={1.25} fontWeight="700" color={theme.textLight}>
          Add Task
        </Text>
      </Button>
    </S.EmptyTasksListContainer>
  )
}

export default EmptyTasksList
