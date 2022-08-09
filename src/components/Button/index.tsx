import { MouseEventHandler } from 'react'
import { ButtonContainer } from './styles'

export const Button = (props: Button.Props): JSX.Element => {
    return (
        <ButtonContainer {...props}>
            {props.children}
        </ButtonContainer>
    )
}

export namespace Button {
  export type Props = {
    width: number
    height: number
    backgroundColor: string
    borderColor?: string
    borderWidth?: number
    borderRadius?: string
    children: React.ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>
    className?: string
  }
}