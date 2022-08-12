import { ThemeProvider } from 'styled-components'

import { useAppSelector } from '@/hooks'

import { selectSettingsTheme } from '@/store/slices'

import { GlobalStyle } from '@/styles'

export const Theme = ({ children }: Theme.Props) => {
  const theme = useAppSelector(selectSettingsTheme)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}

namespace Theme {
  export type Props = {
    children: any
  }
}
