import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FieldError, useRegisterMutation } from '../generated/graphql'

function Register() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
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

  const toErrorMap = (errors: FieldError[]) => {
    const errorMap: Record<string, string> = {};
    errors.forEach(({ field, message }) => {
      errorMap[field] = message
    })
    return errorMap
  }


  return (
    <div>
      <h1 className='font-bold text-center text-xl'>Register Page</h1>
      <form
        className='flex flex-col gap-[10px]'
        // method="POST"
        onSubmit={async (e) => {
          e.preventDefault()
          const response = await register({ variables: form })
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
