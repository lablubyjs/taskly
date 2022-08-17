import React from 'react'

import Check from '@/images/check.svg'
import Close from '@/images/close.svg'

import { Button, EmptyTasksList } from '@/components'

import { useAppDispatch, useAppSelector } from '@/hooks'

import {
  pinnedTask,
  selectPinnedTasks,
  selectSettingsTheme,
  selectTasks,
  unPinnedTask,
} from '@/store/slices'

import { ITask } from '@/shared/interfaces'
import { dateToLocaleString } from '@/shared/utils'

import { Card, Text } from '@/styles'
import * as S from './styles'

export const Weekenly = () => {
  const today = new Date()
  const firstDay = today.getDate() - today.getDay()
  const beginWeek = new Date(today.setDate(firstDay))
  const endWeek = new Date(today.setDate(today.getDate() + 6))

  const tasks = useAppSelector(selectTasks)
  const pinnedTasks = useAppSelector(selectPinnedTasks)
  const theme = useAppSelector(selectSettingsTheme)
  const dispatch = useAppDispatch()

  const filteredTasks = tasks.filter((task: ITask) => {
    const taskDate = new Date(task.date)
    return taskDate >= beginWeek && taskDate <= endWeek
  })

  const pinnedTaskHandler = (taskId: string, isPinned: boolean) => {
    console.log(taskId, isPinned)
    isPinned ? dispatch(unPinnedTask(taskId)) : dispatch(pinnedTask(taskId))
  }

  if (!filteredTasks.length) {
    return (
      <S.TaskListContainer>
        <S.TasksList>
          <EmptyTasksList />
        </S.TasksList>
      </S.TaskListContainer>
    )
  }

  return (
    <S.TasksListContainer>
      <S.TasksList>
        {filteredTasks.map((task: ITask) => {
          console.log(pinnedTasks)
          const taskDate = new Date(task.date)
          const taskDone = today >= taskDate
          const isPinned = pinnedTasks.includes(task)

          return (
            <Card
              width="50vw"
              height="10vh"
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
                <Button
                  backgroundColor={theme.buttonControl}
                  height={2}
                  width={'2rem'}
                  borderRadius={'50%'}
                  onClick={() => pinnedTaskHandler(task.id || '', isPinned)}
                >
                  {isPinned ? <Close width="15" /> : <Check width="15" />}
                </Button>
              </S.TaskListContainer>
            </Card>
          )
        })}
      </S.TasksList>
    </S.TasksListContainer>
  )
}
