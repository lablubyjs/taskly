import React, { ReactNode } from 'react'
import { FieldError } from 'react-hook-form'

import * as S from './styles'

export const Label = (props: Label.Props): JSX.Element => {
  return (
    <>
      <S.LabelContent>{props.children}</S.LabelContent>
      {props.error && <S.Error>{props.error.message}</S.Error>}
    </>
  )
}

namespace Label {
  export type Props = {
    children: ReactNode
    error?: FieldError
  }
}
