import styled from 'styled-components'
import { SideMenu } from '@/components/SideMenu'

export const SideMenuContainer = styled.section`
  width: 29rem;
  height: 100%;
  background-color: ${({theme}) => theme.panelLeft};
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`