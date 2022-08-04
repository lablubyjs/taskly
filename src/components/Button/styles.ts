import styled from 'styled-components'
import { Button } from '@/components'

export const ButtonContainer = styled.button<Button.Props>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: ${({width}) => `${width}rem`};
    height: ${({height}) => `${height}rem`};
    border: ${({borderWidth, borderColor}) =>
        borderColor && borderWidth
        ? `${borderWidth}px solid ${borderColor}`
        : 'none'};
    background-color: ${({backgroundColor}) => backgroundColor};
    border-radius: ${({borderRadius}) => `${borderRadius}px`};
`;