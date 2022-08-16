import styled, { keyframes } from 'styled-components'

const animationModalContent = keyframes`
  from {
    transform: scale(0.6);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`

export const ModalOverlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
`

export const ModalContent = styled.div`
  width: 35rem;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 10px;
  animation: ${animationModalContent} 0.3s ease;
  background: ${({ theme }) => theme.textNumber};
`

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.2rem;
  }

  button:first-child {
    background-color: ${({ theme }) => theme.textDark};
  }

  button {
    &:hover {
      background-color: ${({ theme }) => theme.stroke};
      p {
        color: ${({ theme }) => theme.textDark};
      }
    }
  }
`
