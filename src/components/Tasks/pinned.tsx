import React from 'react'
import { useRouter } from 'next/router'

import Plus from '@/images/plus.svg'

import { Button } from '@/components/Button'

import { useAppSelector } from '@/hooks'

import { selectPinnedTasks, selectSettingsTheme } from '@/store/slices'

import { ITask } from '@/shared/interfaces'

import { Card, FlexRowContainer, Text } from '@/styles'
import * as S from './styles'
import { dateToLocaleString } from '@/shared/utils'

export const PinnedTasks = () => {
  const router = useRouter()
  const pinnedTasks = useAppSelector(selectPinnedTasks)
  const theme = useAppSelector(selectSettingsTheme)

  const addPinnedTask = (
    <Card width="22rem" backgroundColor={theme.background} borderRadius="20px">
      <FlexRowContainer>
        <Button
          backgroundColor={theme.buttonDone}
          height={3}
          width={'3rem'}
          borderRadius={'10px'}
          onClick={() => router.push('/tasks/list')}
        >
          <Plus />
        </Button>
        <Text fontSize={1.25} fontWeight="700" color={theme.textDark}>
          Add new weekly pin
        </Text>
      </FlexRowContainer>
    </Card>
  )

  if (!pinnedTasks.length) {
    return (
      <S.PinnedTasksContainer>
        <Text
          fontSize={1.5}
          fontWeight="400"
          color={theme.textDark}
          align="center"
        >
          You are not pinned tasks
        </Text>
        {addPinnedTask}
      </S.PinnedTasksContainer>
    )
  }

  return (
    <S.PinnedTasksContainer>
      <Text fontSize={1.5} fontWeight="400" color={theme.textDark}>
        Weekly Pinned
      </Text>
      {pinnedTasks.map((task: ITask) => {
        return (
          <Card
            width="22rem"
            backgroundColor={theme.background}
            borderRadius="20px"
            key={task.id}
          >
            <S.TaskPinnedContainer>
              <S.TaskEmoji
                width="3rem"
                height="3rem"
                backgroundColor={theme.buttonDone}
                borderRadius="10px"
              >
                🤓
              </S.TaskEmoji>
              <S.TaskContent>
                <Text fontSize={1.25} fontWeight="700" color={theme.textDark}>
                  {task.title}
                </Text>
                <Text fontSize={1} fontWeight="500" color={theme.textDark}>
                  {dateToLocaleString(new Date(task.date), 'en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
                {task.tag && <S.TaskTag>{task.tag}</S.TaskTag>}
                {task.description && (
                  <Text fontSize={0.9} fontWeight="400" color={theme.textDark}>
                    {task.description}
                  </Text>
                )}
              </S.TaskContent>
            </S.TaskPinnedContainer>
          </Card>
        )
      })}
      {addPinnedTask}
    </S.PinnedTasksContainer>
  )
}
