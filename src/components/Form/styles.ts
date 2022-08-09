import styled from 'styled-components'

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-style: italic;
`

export const FormContent = styled.form`
  width: 30vw;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  border: ${({ theme }) => `1px solid ${theme.buttonControl}`};
  border-radius: 14px;
  text-align: center;
  padding: 1rem;
  gap: 1.25rem;
`

export const LabelContent = styled.label`
  input {
    width: 25vw;
    height: 3rem;
    outline: none;
    border: none;
    border-bottom: 2px solid var(--light-grey);
    background-color: transparent;
    vertical-align: middle;
    font-family: inherit;
    border: ${({ theme }) => `1px solid ${theme.buttonControl}`};
    border-radius: 14px;
    text-align: center;
  }
  input:invalid {
    border-color: red;
  }
`

export const Error = styled.div`
  padding: 1rem;
  color: red;
`
