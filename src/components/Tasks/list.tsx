import React, { useState } from 'react'
import { useRouter } from 'next/router'

import ArrowLeft from '@/images/arrow-left.svg'
import ArrowRight from '@/images/arrow-right.svg'
import Plus from '@/images/plus.svg'

import { Button, EmptyTasksList } from '@/components'

import { useAppSelector } from '@/hooks'

import { selectSettingsTheme, selectTasks } from '@/store/slices'

import { ITask } from '@/shared/interfaces'
import { dateToLocaleString } from '@/shared/utils'

import { Card, Text } from '@/styles'
import * as S from './styles'

export const TasksList = () => {
  const router = useRouter()
  const today = new Date()

  const [currentDate, setCurrentDate] = useState<Date>(today)
  const tasks = useAppSelector(selectTasks)
  const theme = useAppSelector(selectSettingsTheme)

  const filteredTasks = tasks.filter(
    (task: ITask) => new Date(task.date).getDate() === currentDate.getDate()
  )

  const formattedDate = dateToLocaleString(currentDate, 'en-US', {
    weekday: 'long',
    day: '2-digit',
  }).replace(/(\d+)( )([a-z]+)/i, '$3$2$1')

  return (
    <S.TasksListContainer>
      <S.TasksListHeader>
        <S.TasksListDateContainer>
          <Text fontSize={2.5} fontWeight="500" color={theme.textDark}>
            {currentDate.toString() === today.toString()
              ? "Today's "
              : 'Tasks '}
            schedule
          </Text>
          <Text fontSize={2.5} fontWeight="500" color={theme.textLight}>
            {formattedDate}
          </Text>
          <Button
            backgroundColor={theme.buttonControl}
            height={1.5}
            width={'1.5rem'}
            borderRadius={'50%'}
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setDate(currentDate.getDate() - 1))
              )
            }
          >
            <ArrowLeft />
          </Button>
          <Button
            backgroundColor={theme.buttonControl}
            height={1.5}
            width={'1.5rem'}
            borderRadius={'50%'}
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setDate(currentDate.getDate() + 1))
              )
            }
          >
            <ArrowRight />
          </Button>
        </S.TasksListDateContainer>
        <Button
          backgroundColor={theme.buttonDone}
          height={3.3}
          width={'3.4rem'}
          borderRadius={'30px 20px 30px 22px'}
          onClick={() => router.push('/tasks/create')}
        >
          <Plus />
        </Button>
      </S.TasksListHeader>
      {!filteredTasks.length && <EmptyTasksList />}
      <S.TasksList>
        {filteredTasks.map((task: ITask) => {
          const taskDate = new Date(task.date)
          const taskDone = taskDate <= today

          return (
            <Card
              width="29rem"
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
                {!taskDone && (
                  <div>
                    <Text
                      fontSize={0.8}
                      fontWeight="500"
                      color={theme.textDark}
                    >
                      {task.description}
                    </Text>
                  </div>
                )}
              </S.TaskListContainer>
            </Card>
          )
        })}
      </S.TasksList>
    </S.TasksListContainer>
  )
}
