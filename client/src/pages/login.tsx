import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FieldError, MeDocument, MeQuery, useLoginMutation } from '../generated/graphql'

function Login() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
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

  const toErrorMap = (errors: FieldError[]) => {
    const errorMap: Record<string, string> = {};
    errors.forEach(({ field, message }) => {
      errorMap[field] = message
    })
    return errorMap
  }


  return (
    <div>
      <h1 className='font-bold text-center text-xl'>Login Page</h1>
      <form
        className='flex flex-col gap-[10px]'
        // method="POST"
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
            router.push('/')
          }
        }
        }
      >
        <label htmlFor='username'>Username
          <input id="username" type="text" name="username" value={form.username}
            onChange={(e) => handleChange(e)} />
          {errorState.field === "username" && <p className='text-red-500'>{errorState.message}</p>}
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
        <button type="submit" className='bg-blue-500  w-[5rem] rounded-xl p-1 text-white'>Login</button>
      </form>
    </div>
  )
}

export default Login
