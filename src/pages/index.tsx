import { parseCookies } from 'nookies'
import * as C from '@/components'

import type { GetServerSideProps, NextPage } from 'next'
import { IUser } from '@/shared/interfaces'
import { getApiClient } from '@/shared/services/axios.client.config'

const Home: NextPage = (props) => {
  console.log(props)

  return (
    <main>
      <C.SideMenu />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  const user = await apiClient.get('/user/account')

  return {
    props: {
      user,
    },
  }
}

namespace Home {
  export type Props = {
    user: IUser
  }
}

export default Home
