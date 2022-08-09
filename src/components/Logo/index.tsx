import { FlexRowContainer, lightTheme, Text } from '@/styles'
import React from 'react'
import { Button } from '../Button'
import Plus from '../../../public/images/plus.svg'

export const Logo = () => {
  return (
    <FlexRowContainer>
      <Button
        backgroundColor={lightTheme.buttonDone}
        height={1.9}
        width={'1.8rem'}
        borderRadius={'15px 10px 13px 12px'}
        onClick={() => {}}
      >
        <Plus />
      </Button>
      <Text fontSize={1.25} fontWeight="700" color={lightTheme.textDark}>
        taskly
      </Text>
    </FlexRowContainer>
  )
}
