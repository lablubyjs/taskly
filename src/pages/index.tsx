import type { NextPage } from 'next'
import { parseCookies } from 'nookies'

import * as C from '@/components'

import { ITask, IUser } from '@/shared/interfaces'
import { getApiClient } from '@/shared/services'

import { wrapper } from '@/store'
import { addUser, addTasks } from '@/store/slices'

const Home: NextPage<Home.Props> = (props) => {
  return (
    <main>
      <C.SideMenu />
    </main>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
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
        tasks
      }
    }
})

namespace Home {
  export type Props = {
    user: IUser
    tasks: ITask[]
  }
}

export default Home
