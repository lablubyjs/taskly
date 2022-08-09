import styled from 'styled-components'

export const SideMenuContainer = styled.section`
  width: 29rem;
  height: 100%;
  background-color: ${({theme}) => theme.sideMenu};
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`