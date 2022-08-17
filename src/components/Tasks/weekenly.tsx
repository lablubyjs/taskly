import React from 'react'

import { Button, EmptyTasksList } from '@/components'

import { useAppDispatch, useAppSelector } from '@/hooks'

import { pinnedTask, selectPinnedTasks, selectSettingsTheme, selectTasks } from '@/store/slices'

import { ITask } from '@/shared/interfaces'
import { dateToLocaleString } from '@/shared/utils'

import { Card, Text } from '@/styles'
import * as S from './styles'

export const Weekenly = () => {
  const today = new Date()
  const firstDay = today.getDate() - today.getDay()
  const beginWeek = new Date(today.setDate(firstDay))
  const endWeek = new Date(today.setDate(today.getDate()+6))

  const tasks = useAppSelector(selectTasks)
  const pinnedTasks = useAppSelector(selectPinnedTasks)
  const theme = useAppSelector(selectSettingsTheme)
  const dispatch = useAppDispatch()

  const filteredTasks = tasks.filter(
    (task: ITask) => {
        const taskDate = new Date(task.date)
        return taskDate >= beginWeek && taskDate <= endWeek
    }
  )

  return (
    <S.TasksListContainer>
      {!filteredTasks.length && <EmptyTasksList />}
      <S.TasksList>
        {filteredTasks.map((task: ITask) => {
          const taskDate = new Date(task.date)
          const taskDone = today >= taskDate
          const isPinned = pinnedTasks.includes(task)

          return (
            <Card
              width="50vw"
              height='10vh'
              backgroundColor={taskDone ? theme.buttonDone : theme.buttonTask}
              borderRadius="20px"
              key={task.id}
            >
              <S.TaskListContainer>
                <S.TaskEmoji
                  width="2rem"
                  height="2rem"
                  backgroundColor={theme.background}
                  borderRadius="10px"
                >
                  🤓
                </S.TaskEmoji>
                <Text
                  fontSize={1}
                  fontWeight="700"
                  color={theme.textDark}
                  align="left"
                >
                  {task.title}
                </Text>
                <Text fontSize={0.8} fontWeight="500" color={theme.textDark}>
                  {dateToLocaleString(taskDate, 'en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </S.TaskListContainer>
              <Button
                backgroundColor={theme.buttonControl}
                height={1.5}
                width={'1.5rem'}
                borderRadius={'50%'}
                onClick={() => dispatch(pinnedTask(task.id || ''))}
              >
                {isPinned ? 'Unpin' : 'Pin'}
              </Button>
            </Card>
          )
        })}
      </S.TasksList>
    </S.TasksListContainer>
  )
}
