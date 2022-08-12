import type { NextPage } from 'next'
import Link from 'next/link'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as C from '@/components'

import { useAppSelector } from '@/hooks'

import { CreateTaskFormTypes } from '@/shared/interfaces'
import { tasksServices } from '@/shared/services'

import { selectSettingsTheme } from '@/store/slices'

import { FlexColumnContainer, Text } from '@/styles'

const createTaskSchema = yup.object({
  title: yup.string().required('Please enter the title'),
  description: yup.string().optional(),
  date: yup.date().required('Please enter the date'),
  time: yup.string().required('Please enter the time'),
  tag: yup.string().required('Please enter the tag'),
})

const Register: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskFormTypes>({
    resolver: yupResolver(createTaskSchema),
  })

  const { create } = tasksServices()
  const theme = useAppSelector(selectSettingsTheme)

  const createUserHandler = async ({
    title,
    description,
    time,
    tag,
    date,
  }: CreateTaskFormTypes) => {
    try {
      const data = {
        title,
        description,
        time,
        tag,
        date: new Date(date),
        icon: 'icon',
        isDone: false,
      }
      await create(data)
      window.location.href = '/'
    } catch (error) {
      alert(error)
    }
  }

  return (
    <main>
      <FlexColumnContainer>
        <C.Logo />
        <C.Form onSubmit={handleSubmit(createUserHandler)}>
          <Text fontSize={1.5} fontWeight="bold" color={theme.textLight}>
            Create new task
          </Text>
          <C.Label error={errors.title}>
            <input placeholder="Title" {...register('title')} />
          </C.Label>
          <C.Label error={errors.description}>
            <input placeholder="Description" {...register('description')} />
          </C.Label>
          <C.Label error={errors.date}>
            <input placeholder="Date" {...register('date')} type="date" />
          </C.Label>
          <C.Label error={errors.time}>
            <input placeholder="Time" {...register('time')} type="time" />
          </C.Label>
          <C.Label error={errors.tag}>
            <input placeholder="Tag" {...register('tag')} type="tag" />
          </C.Label>
          <C.Button
            width={'25vw'}
            height={3}
            backgroundColor={theme.buttonDone}
            borderRadius={'15px'}
          >
            <Text fontSize={1} fontWeight="700" color={theme.textDark}>
              Add task
            </Text>
          </C.Button>
        </C.Form>
        <Link href="/">
          <Text fontSize={1.25} fontWeight="500" color={theme.textLight}>
            Go back home
          </Text>
        </Link>
      </FlexColumnContainer>
    </main>
  )
}

export default Register