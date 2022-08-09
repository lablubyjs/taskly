import React, { ReactNode } from 'react'

import * as S from './styles'

export const Form = (props: Form.Props): JSX.Element => {
  return (
    <S.FormContent onSubmit={props.onSubmit}>{props.children}</S.FormContent>
  )
}

namespace Form {
  export type Props = {
    onSubmit: () => {}
    children: ReactNode
  }
}
