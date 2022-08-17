import styled from 'styled-components'

interface TextProps {
  fontSize: number
  fontWeight: string
  color?: string
  align?: string
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
  text-align: ${({ align }) => align || ''};
`

export const FlexRowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`

export const FlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
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

export const MainContainer = styled.main`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  gap: 1rem;
`

export const Element = styled.input.attrs({
  styled: `${(props: any) => props}`,
})``
