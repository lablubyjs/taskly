import type { NextPage } from 'next'
import { useState } from 'react'
import { parseCookies } from 'nookies'

import * as C from '@/components'

import { useAppDispatch } from '@/hooks'

import { ITask, IUser } from '@/shared/interfaces'
import { getApiClient } from '@/shared/services'

import { wrapper } from '@/store'
import { addUser, addTasks, removeUser } from '@/store/slices'

import { MainContainer, FlexColumnContainer } from '@/styles'

const Home: NextPage<Home.Props> = (props) => {
  const [showModalLogout, setShowModalLogout] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(removeUser())
    window.location.href = '/authentication/login'
  }

  return (
    <MainContainer>
      <C.SideMenu />
      <C.TasksList />
      <FlexColumnContainer>
        <C.Profile onSetShowModalLogout={setShowModalLogout} />
        <C.WeatherWidget city={'Arapiraca'} days={'1'} title={'Arapiraca'} />
        <C.PomodoroTimerWidget />
      </FlexColumnContainer>
      {showModalLogout && (
        <C.Logout
          onLogout={logoutHandler}
          onSetShowModalLogout={setShowModalLogout}
        />
      )}
    </MainContainer>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store: any) => async (context) => {
    const { accessToken } = parseCookies(context)
    const apiClient = getApiClient(context)

    if (!accessToken) {
      return {
        redirect: {
          destination: 'authentication/login',
          permanent: false,
        },
      }
    }

    const user: IUser = await apiClient.get('/user/account')
    const tasks: ITask[] = await apiClient.get('/tasks/list')

    store.dispatch(addUser(user))
    store.dispatch(addTasks(tasks))

    return {
      props: {
        user,
        tasks,
      },
    }
  }
)

namespace Home {
  export type Props = {
    user: IUser
    tasks: ITask[]
  }
}

export default Home
