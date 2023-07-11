import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { initializeApollo } from '@/lib/apolloClient'
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils'

function Login() {
  const router = useRouter()
  const [form, setForm] = useState({ usernameOrEmail: '', password: '' })
  const [login, { loading, error }] = useLoginMutation()

  const [errorState, setError] = useState({ field: '', message: '' })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  useEffect(() => {
    const errorElement = document.getElementById(errorState.field)
    if (errorElement) {
      errorElement.style.border = "1px solid red"
    }
  }, [errorState])


  if (loading) { return <div>Loading</div> }

  if (error) {
    return <div>An error has happened!</div>
  }


  return (
    <div>
      <h1 className='font-bold text-center text-xl'>Login Page</h1>
      <form
        className='flex flex-col gap-[10px]'
        onSubmit={async (e) => {
          e.preventDefault()
          const response = await login({
            variables: form, update(cache, { data }) {
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
            setError(prev => ({
              ...prev,
              field: Object.keys(errorMap)[0],
              message: errorMap[Object.keys(errorMap)[0]]
            }))
          } else if (response.data?.login.user) {

            const apolloClient = initializeApollo()
            await apolloClient.resetStore()
            router.push('/')
          }
        }
        }
      >
        <label htmlFor='usernameOrEmail'>Username
          <input id="usernameOrEmail" type="text" name="usernameOrEmail" value={form.usernameOrEmail}
            onChange={(e) => handleChange(e)} />
          {errorState.field === "usernameOrEmail" && <p className='text-red-500'>{errorState.message}</p>}
        </label>


        <label htmlFor='password'>Password
          <input
            id="password"
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
            value={form.password}
          />
          {errorState.field === "password" && <p className='text-red-500'>{errorState.message}</p>}
        </label>
        <Link href="/forgot-password">Forgot Password</Link>
        <button type="submit" className='bg-blue-500  w-[5rem] rounded-xl p-1 text-white'>Login</button>
      </form>
    </div>
  )
}

export default Login
