import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import profile from '@/images/profile.png'

import { Button } from '@/components/Button'

import { useAppSelector } from '@/hooks'

import { selectSettingsTheme, selectUser } from '@/store/slices'

import { Text } from '@/styles'
import * as S from './styles'

export const Profile = (props: Profile.Props) => {
  const router = useRouter()
  const user = useAppSelector(selectUser)
  const theme = useAppSelector(selectSettingsTheme)

  return (
    <S.ProfileContainer>
      <div>
        <Text fontSize={1.1} fontWeight="700" color={theme.textDark}>
          {user.name}
        </Text>
        <Button
          backgroundColor="transparent"
          height={2}
          width={'auto'}
          onClick={() => router.push('/settings')}
        >
          <Text fontSize={0.8} fontWeight="700" color={theme.textLight}>
            My settings
          </Text>
        </Button>
      </div>
      <Button
        backgroundColor="transparent"
        height={2}
        width={'auto'}
        onClick={() => props.onSetShowModalLogout(true)}
      >
        <Image src={profile} width={50} height={50} alt="profile photo" />
      </Button>
    </S.ProfileContainer>
  )
}

namespace Profile {
  export type Props = {
    onSetShowModalLogout: React.Dispatch<React.SetStateAction<boolean>>
  }
}
