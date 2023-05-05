/* eslint-disable react/function-component-definition */
import React, { useState } from 'react'
import { useForgotPasswordMutation } from '@/generated/graphql'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [forgotPassword] = useForgotPasswordMutation()

    return (
        <div>
            <h1 className='font-bold text-center text-xl'>Forgot Password</h1>
            <form
                className='flex flex-col gap-[10px]'
                onSubmit={async (e) => {
                    e.preventDefault()
                    await forgotPassword({
                        variables: { email }
                    })
                }
                }
            >
                <label htmlFor='email'>Enter your email
                    <input id="email" type="email" name="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </label>

                <button type="submit" className='bg-blue-500  w-[5rem] rounded-xl p-1 text-white'>Send Reset Password Email</button>
            </form>
        </div>
    )
}


export default ForgotPassword