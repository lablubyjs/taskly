import React from 'react'
import { Calendar, Logo, PinnedTasks } from '@/components'
import * as S from './styles'

export const SideMenu = () => {
  return (
    <S.SideMenuContainer>
      <Logo />
      <PinnedTasks/>
      <Calendar />
    </S.SideMenuContainer>
  )
}
