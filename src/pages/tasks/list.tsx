import type { NextPage } from 'next'
import Link from 'next/link'

import * as C from '@/components'

import { useAppSelector } from '@/hooks'

import { selectSettingsTheme } from '@/store/slices'

import { FlexColumnContainer, Text } from '@/styles'

const List: NextPage = () => {
  const theme = useAppSelector(selectSettingsTheme)

  return (
    <main>
      <FlexColumnContainer>
        <C.Logo />
        <C.Weekenly/>
        <Link href="/">
          <Text fontSize={1.25} fontWeight="500" color={theme.textLight}>
            Go back home
          </Text>
        </Link>
      </FlexColumnContainer>
    </main>
  )
}

export default List
