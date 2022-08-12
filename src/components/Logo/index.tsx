import React from 'react'

import Plus from '@/images/plus.svg'

import { Button } from '@/components/Button'

import { useAppSelector } from '@/hooks'

import { selectSettingsTheme } from '@/store/slices'

import { FlexRowContainer, Text } from '@/styles'

export const Logo = () => {
  const theme = useAppSelector(selectSettingsTheme)

  return (
    <FlexRowContainer>
      <Button
        backgroundColor={theme.buttonDone}
        height={1.9}
        width={'1.8rem'}
        borderRadius={'15px 10px 13px 12px'}
        onClick={() => {}}
      >
        <Plus />
      </Button>
      <Text fontSize={1.25} fontWeight="700" color={theme.textDark}>
        taskly
      </Text>
    </FlexRowContainer>
  )
}
