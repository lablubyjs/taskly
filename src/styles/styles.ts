import { HTMLAttributes } from 'react'
import styled from 'styled-components'

interface TextProps {
  fontSize: number
  fontWeight: string
  color?: string
}

interface CardProps {
  width: string
  height?: string
  backgroundColor: string
  borderRadius: string
}

export const Text = styled.p<TextProps>`
  font-size: ${({ fontSize }) => `${fontSize}rem`};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'regular')};
  color: ${({ color, theme }) => (color ? color : theme.textDark)};
`

export const FlexRowContainer = styled.div`
  display: flex;
  gap: 0.8rem;
`

export const FlexColumnContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`

export const Card = styled.div<CardProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ borderRadius }) => borderRadius};
  padding: 1rem;
`
