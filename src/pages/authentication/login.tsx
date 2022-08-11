import type { NextPage } from 'next'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as C from '@/components'

import { useAppDispatch } from '@/hooks'

import { ILogin } from '@/shared/interfaces'
import { authServices } from '@/shared/services'

import { addUser } from '@/store/slices'

import { FlexColumnContainer, lightTheme, Text } from '@/styles'

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please provide a valid email')
    .required('Please enter the email'),
  password: yup.string().required('Please enter the password'),
})

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(loginSchema),
  })

  const dispatch = useAppDispatch()
  const { login } = authServices()

  const loginHandler = async ({ email, password }: ILogin) => {
    try {
      const response = await login({ email, password })
      dispatch(addUser(response.user))
      window.location.href = '/'
    } catch (error) {
      alert(error)
    }
  }

  return (
    <main>
      <FlexColumnContainer>
        <C.Logo />
        <C.Form onSubmit={handleSubmit(loginHandler)}>
          <Text fontSize={1.5} fontWeight="bold" color={lightTheme.textLight}>
            Login
          </Text>
          <C.Label error={errors.email}>
            <input placeholder="Email" {...register('email')} />
          </C.Label>
          <C.Label error={errors.password}>
            <input
              placeholder="Password"
              {...register('password')}
              type="password"
            />
          </C.Label>
          <C.Button
            width={'25vw'}
            height={3}
            backgroundColor={lightTheme.buttonDone}
            borderRadius={'15px'}
          >
            <Text fontSize={1} fontWeight="700" color={lightTheme.textDark}>
              Sign In
            </Text>
          </C.Button>
        </C.Form>
        <Link href="/authentication/register">
          <Text fontSize={1} fontWeight="500" color={lightTheme.textLight}>
            Or <strong>sign up</strong>
          </Text>
        </Link>
      </FlexColumnContainer>
    </main>
  )
}

export default Login
