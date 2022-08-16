import { Button } from '@/components'

import IconLogout from '@/images/logout.svg'
import IconNoLogout from '@/images/no-logout.svg'

import { useAppSelector } from '@/hooks'

import { selectSettingsTheme } from '@/store/slices'

import { Text } from '@/styles'
import * as S from './styles'

export const Logout = (props: Logout.Props) => {
  const theme = useAppSelector(selectSettingsTheme)

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <Text fontSize={2} fontWeight="700" color={theme.textLight}>
          Do you really want to go out?
        </Text>
        <S.Buttons>
          <Button
            onClick={() => props.onSetShowModalLogout(false)}
            backgroundColor="transparent"
            borderRadius={'10px'}
            height={10}
            width={'8rem'}
          >
            <IconNoLogout />
            <Text fontSize={1.5} fontWeight="700" color={theme.textLight}>
              No
            </Text>
          </Button>
          <Button
            onClick={props.onLogout}
            backgroundColor={theme.tagBackground}
            borderRadius={'10px'}
            height={10}
            width={'8rem'}
          >
            <IconLogout />
            <Text fontSize={1.5} fontWeight="700" color={theme.textDark}>
              Yes
            </Text>
          </Button>
        </S.Buttons>
      </S.ModalContent>
    </S.ModalOverlay>
  )
}

namespace Logout {
  export type Props = {
    onSetShowModalLogout: React.Dispatch<React.SetStateAction<boolean>>
    onLogout: () => void
  }
}
