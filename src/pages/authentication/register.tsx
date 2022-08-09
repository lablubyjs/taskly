import type { NextPage } from 'next'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as C from '@/components'

import { useAppDispatch } from '@/hooks'

import { IRegister } from '@/shared/interfaces'
import { authServices } from '@/shared/services'

import { addUser } from '@/store/user-slice'

import { FlexColumnContainer, lightTheme, Text } from '@/styles'

const registerUserSchema = yup.object({
  name: yup.string().required('Please enter the name'),
  email: yup
    .string()
    .email('Please provide a valid email')
    .required('Please enter the email'),
  password: yup.string().required('Please enter the password'),
})

const Register: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: yupResolver(registerUserSchema),
  })

  const dispatch = useAppDispatch()
  const { registerUser } = authServices()

  const registerUserHandler = async ({ name, email, password }: IRegister) => {
    try {
      const response = await registerUser({ name, email, password })
      await dispatch(addUser(response.user))
      window.location.href = '/'
    } catch (error) {
      alert(error)
    }
  }

  return (
    <main>
      <FlexColumnContainer>
        <C.Logo />
        <C.Form onSubmit={handleSubmit(registerUserHandler)}>
          <Text fontSize={1.5} fontWeight="bold" color={lightTheme.textLight}>
            Register
          </Text>
          <C.Label error={errors.name}>
            <input placeholder="Name" {...register('name')} />
          </C.Label>
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
              Sign Up
            </Text>
          </C.Button>
        </C.Form>
        <Link href="/authentication/login">
          <Text fontSize={1} fontWeight="500" color={lightTheme.textLight}>
            Or <strong>sign in</strong>
          </Text>
        </Link>
      </FlexColumnContainer>
    </main>
  )
}

export default Register
