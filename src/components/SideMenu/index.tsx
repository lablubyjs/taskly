import React from 'react'
import { Calendar, Logo } from '@/components'
import * as S from './styles'

export const SideMenu = () => {
  return (
    <S.SideMenuContainer>
      <Logo/>
      <Calendar />
    </S.SideMenuContainer>
  )
}