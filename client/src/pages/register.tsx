import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql'
import toErrorMap from './utils'

function Register() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '', email: '' })
  const [register, { loading, error }] = useRegisterMutation()

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
      <h1 className='font-bold text-center text-xl'>Register Page</h1>
      <form
        className='flex flex-col gap-[10px]'
        onSubmit={async (e) => {
          e.preventDefault()
          const response = await register({
            variables: { options: form }, update(cache, { data }) {
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
            setError(prev => ({
              ...prev,
              field: Object.keys(errorMap)[0],
              message: errorMap[Object.keys(errorMap)[0]]
            }))
          } else if (response.data?.register.user) {
            router.push('/')
          }
        }
        }
      >
        <label htmlFor='email'>Email
          <input id="email" type="email" name="email" value={form.email}
            onChange={(e) => handleChange(e)} />
          {errorState.field === "email" && <p className='text-red-500'>{errorState.message}</p>}
        </label>

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
        <button type="submit" className='bg-blue-500  w-[5rem] rounded-xl p-1 text-white'>Register</button>
      </form>
    </div>
  )
}

export default Register
