import type { AppProps } from 'next/app'

import { Theme } from '@/components'

import { wrapper } from '@/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <Component {...pageProps} />
    </Theme>
  )
}

export default wrapper.withRedux(MyApp)
