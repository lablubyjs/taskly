import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import Person from '@/images/person.svg'
import * as C from '@/components'

import {
  FlexColumnContainer,
  FlexRowContainer,
  Text,
} from '@/styles'
import { useAppSelector } from '@/hooks'
import { selectSettingsTheme } from '@/store/slices'

const NotFound: NextPage = () => {
  const router = useRouter()
  const theme = useAppSelector(selectSettingsTheme)

  const goToHome = () => {
    router.replace('/')
  }

  return (
    <main>
      <FlexRowContainer>
        <Person width="700" height="90vh" />
        <FlexColumnContainer>
          <C.Logo />
          <Text fontSize={7} fontWeight="700" color={theme.textLight}>
            404...
          </Text>
          <Text fontSize={2} fontWeight="500">
            Ops. This page not exists!
          </Text>
          <Text fontSize={1.5} fontWeight="400" color={theme.textLight}>
            We couldn&apos;t find the page you are looking for.
          </Text>
          <Text fontSize={1.25} fontWeight="400" color={theme.textLight}>
            You may:
          </Text>
          <C.Button
            width={'15rem'}
            height={3}
            backgroundColor={theme.buttonDone}
            borderRadius={'20px'}
            onClick={goToHome}
          >
            <Text fontSize={1} fontWeight="700" color={theme.textDark}>
              Return home
            </Text>
          </C.Button>
        </FlexColumnContainer>
      </FlexRowContainer>
    </main>
  )
}

export default NotFound
