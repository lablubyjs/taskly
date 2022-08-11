import styled from 'styled-components'

interface TaskEmojiProps {
  width: string
  height?: string
  backgroundColor: string
  borderRadius: string
}

export const PinnedTasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem;
  flex: 1;
`

export const TaskPinnedContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
`

export const TaskListContainer = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;

  p:nth-child(2) {
    width: 70%;
  }

  div:last-child {
    padding-left: 3rem;
  }
`

export const TaskEmoji = styled.div<TaskEmojiProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ borderRadius }) => borderRadius};
`
export const TaskContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

export const TaskTag = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.tagBackground};
  border-radius: 12px;
  padding: 0.3rem 1rem;
  width: fit-content;
  font-size: 0.7rem;
  font-weight: 700;
  color: ${({ theme }) => theme.background}; ;
`
export const TasksListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const TasksListHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
`

export const TasksListDateContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-flow: row wrap;
  gap: 1rem;
  align-items: flex-end;
  align-content: space-between;

  p:first-child {
    width: 100%;
  }
`
export const TasksList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`

export const EmptyTasksListContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 50%;
`
