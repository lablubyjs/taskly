import type { AppProps } from 'next/app'

import { darkTheme, GlobalStyle, lightTheme } from '@/styles'

import { ThemeProvider } from 'styled-components'

function MyApp ({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={lightTheme}>
    <GlobalStyle />

    <Component {...pageProps} />

  </ThemeProvider>
}

export default MyApp
