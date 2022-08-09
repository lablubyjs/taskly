export interface Theme {
  background: string
  sideMenu: string
  buttonPinned: string
  buttonDone: string
  buttonTask: string
  buttonControl: string
  tagBackground: string
  textNumber: string
  textDark: string
  textLight: string
  stroke: string
}

export const lightTheme: Theme = {
  background: '#FFFFFF',
  sideMenu: '#F6F7FB',
  buttonPinned: '#FFFFFF',
  buttonDone: '#F8D57E',
  buttonTask: '#F6F7FB',
  buttonControl: '#ECEFF2',
  tagBackground: '#F4B860',
  textNumber: '#667180',
  textDark: '#2C2543',
  textLight: '#F4B860',
  stroke: '#979797'
}

export const darkTheme: Theme = {
  background: '#525050',
  sideMenu: '#363636',
  buttonPinned: '#999A9E',
  buttonDone: '#F4B860',
  buttonTask: '#363636',
  buttonControl: '#FFFFFF',
  tagBackground: '#CF8F32',
  textNumber: '#667180',
  textDark: '#2C2543',
  textLight: '#FFFFFF',
  stroke: '#979797'
}