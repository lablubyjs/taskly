import type { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as C from '@/components'

import { useAppDispatch, useAppSelector } from '@/hooks'

import {
  removeUser,
  selectSettings,
  selectSettingsTheme,
  setSettings,
} from '@/store/slices'

import { verifyAccessToken } from '@/shared/utils'

import { darkTheme, FlexColumnContainer, lightTheme, Text } from '@/styles'
import { useState } from 'react'

const settingsSchema = yup.object({
  themeMode: yup.string().required('Please enter the theme mode'),
  pomodoroTimer: yup.string().required('Please enter the pomodoro timer'),
})

type SettingsValues = {
  themeMode: string
  pomodoroTimer: string
}

const Settings: NextPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const settings = useAppSelector(selectSettings)
  const theme = useAppSelector(selectSettingsTheme)

  const [showModalLogout, setShowModalLogout] = useState<boolean>(false)

  const logoutHandler = () => {
    dispatch(removeUser())
    window.location.href = '/authentication/login'
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsValues>({
    resolver: yupResolver(settingsSchema),
  })

  const handleSettings = ({ themeMode, pomodoroTimer }: SettingsValues) => {
    const theme = themeMode === 'light' ? lightTheme : darkTheme

    const pomodoroTimerNumber = +pomodoroTimer * 3600
    dispatch(
      setSettings({ themeMode, theme, pomodoroTimer: pomodoroTimerNumber })
    )
  }

  if (showModalLogout) {
    return (
      <main>
        <C.Logout
          onLogout={logoutHandler}
          onSetShowModalLogout={setShowModalLogout}
        />
      </main>
    )
  }

  return (
    <main>
      <FlexColumnContainer>
        <C.Logo />
        <C.Form onSubmit={handleSubmit(handleSettings)}>
          <Text fontSize={2} fontWeight="500" color={theme.textDark}>
            You settings
          </Text>
          <C.Label error={errors.themeMode}>
            <Text fontSize={1} fontWeight="500" color={theme.textDark}>
              Theme Mode
            </Text>
            <select
              {...register('themeMode')}
              defaultValue={settings.themeMode}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </C.Label>
          <C.Label error={errors.pomodoroTimer}>
            <Text fontSize={1} fontWeight="500" color={theme.textDark}>
              Pomodoro Timer
            </Text>
            <Text fontSize={0.9} fontWeight="500" color={theme.textLight}>
              The time is defined in hours
            </Text>
            <input
              placeholder="Timer"
              {...register('pomodoroTimer')}
              defaultValue={settings.pomodoroTimer / 3600}
            />
          </C.Label>
          <C.Button
            width={'25vw'}
            height={3}
            backgroundColor={theme.buttonDone}
            borderRadius={'15px'}
          >
            <Text fontSize={1} fontWeight="700" color={theme.textDark}>
              Save settings
            </Text>
          </C.Button>
        </C.Form>
        <C.Button
          width={'25vw'}
          height={3}
          backgroundColor="transparent"
          borderRadius={'15px'}
          onClick={() => setShowModalLogout(true)}
        >
          <Text fontSize={1.1} fontWeight="700" color={theme.textLight}>
            Log out
          </Text>
        </C.Button>
        <C.Button
          width={'25vw'}
          height={3}
          backgroundColor="transparent"
          borderRadius={'15px'}
          onClick={() => router.push('/')}
        >
          <Text fontSize={1.25} fontWeight="700" color={theme.textLight}>
            Go back home
          </Text>
        </C.Button>
      </FlexColumnContainer>
    </main>
  )
}

export const getServerSideProps = async (context: NextPageContext) => {
  return verifyAccessToken(context)
}

export default Settings
