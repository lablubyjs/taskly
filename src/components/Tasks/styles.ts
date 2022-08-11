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

export const TaskContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
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
