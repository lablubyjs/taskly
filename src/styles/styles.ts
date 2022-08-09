import styled from 'styled-components'

interface TextProps {
  fontSize: number;
  fontWeight: string;
  color?: string;
}

export const Text = styled.p<TextProps>`
  font-size: ${({fontSize}) => `${fontSize}rem`};
  font-weight: ${({fontWeight}) => fontWeight ? fontWeight : 'regular'};
  color: ${({color, theme}) => color ? color : theme.textDark};
`

export const FlexRowContainer = styled.div`
  display: flex;
  gap: 0.8rem;
`

export const FlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`