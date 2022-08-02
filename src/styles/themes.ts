export interface Theme {
  background: string
  panelLeft: string
  buttonPinned: string
  buttonDone: string
  buttonTask: string
  tagBackground: string
  textDark: string
  textLight: string
  stroke: string
}

export const lightTheme: Theme = {
  background: '#FFFFFF',
  panelLeft: '#F6F7FB',
  buttonPinned: '#FFFFFF',
  buttonDone: '#F8D57E',
  buttonTask: '#F6F7FB',
  tagBackground: '#F4B860',
  textDark: '#2C2543',
  textLight: '#F4B860',
  stroke: '#979797'
}

export const darkTheme: Theme = {
  background: '#525050',
  panelLeft: '#363636',
  buttonPinned: '#999A9E',
  buttonDone: '#F4B860',
  buttonTask: '#363636',
  tagBackground: '#CF8F32',
  textDark: '#2C2543',
  textLight: '#FFFFFF',
  stroke: '#979797'
}