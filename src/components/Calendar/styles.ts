import styled from 'styled-components'

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

export const CalendarHeader = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  gap: 1rem;
  text-transform: capitalize;

  p {
    flex: 5;
  }

  select {
    flex: 2;
  }

  div {
    flex: 1;
  }
`

export const CalendarBody = styled.table`
  padding: 1rem;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.background};
  text-align: center;
  table-layout: fixed;

  th {
    color: ${({ theme }) => theme.textLight};
    text-transform: capitalize;
  }

  td {
    color: ${({ theme }) => theme.textNumber};
    text-transform: capitalize;
  }

  td,
  th {
    font-weight: 600;
    width: 2.5rem;
    height: 2.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .today {
    color: ${({ theme }) => theme.textDark};
    background-color: ${({ theme }) => theme.buttonDone};
    border-radius: 50%;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-top: 0.25rem;
`

export const SelectMode = styled.select`
  text-decoration: none;
  border: none;
  outline: none;
  background: transparent;
  font-weight: bold;
  font-family: inherit;
  font-size: 0.7rem;
  text-align: center;
  color: ${({ theme }) => theme.textLight};
`
