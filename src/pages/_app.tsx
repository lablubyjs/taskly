import type { AppProps } from 'next/app'
import NextProgress from 'next-progress'
import { ToastContainer } from 'react-toastify'

import { Theme } from '@/components'

import { wrapper } from '@/store'

import 'react-toastify/dist/ReactToastify.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <NextProgress delay={300} />
      <ToastContainer />
      <Component {...pageProps} />
    </Theme>
  )
}

export default wrapper.withRedux(MyApp)
