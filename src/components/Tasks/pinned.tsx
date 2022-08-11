import React from 'react'
import { useAppSelector } from '@/hooks'

import { selectPinnedTasks } from '@/store/slices'

import { ITask } from '@/shared/interfaces'

import { Card, lightTheme, Text } from '@/styles'
import * as S from './styles'

export const PinnedTasks = () => {
  const pinnedTasks = useAppSelector(selectPinnedTasks)

  console.log(pinnedTasks, 'pin')

  if (!pinnedTasks.length) {
    return (
      <S.PinnedTasksContainer>You are not pinned tasks</S.PinnedTasksContainer>
    )
  }

  return (
    <S.PinnedTasksContainer>
      <Text fontSize={1.5} fontWeight="400" color={lightTheme.textDark}>
        Weekly Pinned
      </Text>
      {pinnedTasks.map((task: ITask) => {
        console.log('rendering')
        return (
          <Card
            width="22rem"
            backgroundColor={lightTheme.background}
            borderRadius="20px"
            key={task.id}
          >
            <S.TaskContainer>
              <S.TaskEmoji
                width="3rem"
                height="3rem"
                backgroundColor={lightTheme.buttonDone}
                borderRadius="10px"
              >
                🤓
              </S.TaskEmoji>
              <S.TaskContent>
                <Text
                  fontSize={1.25}
                  fontWeight="700"
                  color={lightTheme.textDark}
                >
                  {task.title}
                </Text>
                <Text fontSize={1} fontWeight="500" color={lightTheme.textDark}>
                  {new Date(task.date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
                {task.tag && <S.TaskTag>{task.tag}</S.TaskTag>}
                {task.description && (
                  <Text
                    fontSize={0.9}
                    fontWeight="400"
                    color={lightTheme.textDark}
                  >
                    {task.description}
                  </Text>
                )}
              </S.TaskContent>
            </S.TaskContainer>
          </Card>
        )
      })}
    </S.PinnedTasksContainer>
  )
}
