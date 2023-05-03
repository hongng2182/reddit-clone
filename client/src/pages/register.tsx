import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'

const REGISTER_MUTATION = gql`
  mutation Register($options: UserInfoInput!) {
    register(options: $options) {
      errors {
        field
        message
      }
      user {
        id
        createdAt
        updatedAt
        username
        password
      }
    }
  }
`

function Register() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }
  if (loading) { return <div>Loading</div> }

  if (error) {
    return <div>An error has happened!</div>
  }

  return (
    <div>
      Register Page
      <form
        method="POST"
        onSubmit={(e) => {
          e.preventDefault()
          try {
            register({ variables: { options: form } })
          } catch (err) {
            console.log(err)
          }
        }}
      >
        <label htmlFor='username'>Username
          <input type="text" name="username" onChange={(e) => handleChange(e)} />
        </label>

        <label htmlFor='password'>Password
          <input
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
