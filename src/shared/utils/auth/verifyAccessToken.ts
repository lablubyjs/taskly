import { NextPageContext } from 'next'
import { parseCookies } from 'nookies'

export const verifyAccessToken = (context: NextPageContext) => {
  const { accessToken } = parseCookies(context)

  if (!accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}
