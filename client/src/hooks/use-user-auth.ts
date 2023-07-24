import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { MeDocument, MeQuery, useForgotPasswordMutation, useLoginMutation, useRegisterMutation } from '@/generated/graphql'
import { toErrorMap } from '@/utils'
import { setShowSignInModal } from '@/action'
import { initializeApollo } from '@/lib/apolloClient'
import useGlobalState from './use-global-state'


function useUserAuth() {
  // React hooks
  const router = useRouter()
  const { dispatch } = useGlobalState()
  const [errorState, setError] = useState<{ [key: string]: string }>({})
  const formRef = useRef({ username: '', password: '', email: '', usernameOrEmail: '' })

  // GraphQL
  const [register, { loading: registerLoading }] = useRegisterMutation()
  const [login, { loading: logInloading }] = useLoginMutation()
  const [forgotPassword, { loading: resetPasswordLoading, data: forgotPasswordData }] = useForgotPasswordMutation()

  // Utils
  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setError({})
    const { username, email, password } = formRef.current
    const response = await register({
      variables: { options: { username, email, password } }, update(cache, { data }) {
        if (data?.register) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: { me: data.register.user }
          })
        }
      }
    })
    if (response.data?.register.errors) {
      const fieldName = response.data.register.errors
      const errorMap = toErrorMap(fieldName)
      setError(errorMap)
    } else if (response.data?.register.user) {
      dispatch(setShowSignInModal(false))
      router.push('/')
    }
  }

  // handleLogIn
  const handleLogIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setError({})
    const { usernameOrEmail, password } = formRef.current
    const response = await login({
      variables: { usernameOrEmail, password }, update(cache, { data }) {
        if (data?.login) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: { me: data.login.user }
          })
        }
      }
    })
    if (response.data?.login.errors) {
      const fieldName = response.data.login.errors
      const errorMap = toErrorMap(fieldName)
      setError(errorMap)
    } else if (response.data?.login.user) {
      const apolloClient = initializeApollo()
      await apolloClient.resetStore()
      dispatch(setShowSignInModal(false))
    }
  }

  // handleForgotPassword
  const handleForgotPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setError({})
    const response = await forgotPassword({
      variables: { email: formRef.current.email }
    })
    if (response.data?.forgotPassword.errors) {
      const fieldName = response.data.forgotPassword.errors
      const errorMap = toErrorMap(fieldName)
      setError(errorMap)
    }
  }

  return { errorState, setError, handleLogIn, handleRegister, handleForgotPassword, formRef, registerLoading, logInloading, forgotPasswordData, resetPasswordLoading }

}

export default useUserAuth