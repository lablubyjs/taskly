import type { NextPage } from 'next'
import Link from 'next/link'

import { toast } from 'react-toastify'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as C from '@/components'

import { useAppDispatch, useAppSelector } from '@/hooks'

import { IRegister } from '@/shared/interfaces'
import { authServices } from '@/shared/services'

import { addUser, selectSettingsTheme } from '@/store/slices'

import { FlexColumnContainer, Text } from '@/styles'

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
  const theme = useAppSelector(selectSettingsTheme)
  const { registerUser } = authServices()

  const registerUserHandler = async ({ name, email, password }: IRegister) => {
    try {
      const response = await toast.promise(
        registerUser({ name, email, password }),
        {
          pending: 'Loading',
          success: 'Successful registration',
        }
      )
      await dispatch(addUser(response.user))
      window.location.href = '/'
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <main>
      <FlexColumnContainer>
        <C.Logo />
        <C.Form onSubmit={handleSubmit(registerUserHandler)}>
          <Text fontSize={1.5} fontWeight="bold" color={theme.textLight}>
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
            backgroundColor={theme.buttonDone}
            borderRadius={'15px'}
          >
            <Text fontSize={1} fontWeight="700" color={theme.textDark}>
              Sign Up
            </Text>
          </C.Button>
        </C.Form>
        <Link href="/authentication/login">
          <Text fontSize={1} fontWeight="500" color={theme.textLight}>
            Or <strong>sign in</strong>
          </Text>
        </Link>
      </FlexColumnContainer>
    </main>
  )
}

export default Register
