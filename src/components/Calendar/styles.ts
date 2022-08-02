import styled from 'styled-components'

export const Title = styled.p`
  background-color: ${({theme}) => theme.panelLeft};
  color: ${({theme}) => theme.textDark};
  text-transform: capitalize;
  font-size: 1.5rem;
`