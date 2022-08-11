import { ThemeProvider } from 'styled-components'

import { useAppSelector } from '@/hooks'

import { selectThemeMode } from '@/store/slices'

import { darkTheme, GlobalStyle, lightTheme } from '@/styles'

export const Theme = ({ children }: Theme.Props) => {
  const themeMode = useAppSelector(selectThemeMode)

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
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
