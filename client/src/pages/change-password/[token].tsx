/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { MeDocument, MeQuery, useChangePasswordMutation } from '@/generated/graphql'
import toErrorMap from '../utils'

const ChangePassword: NextPage<{ token: string }> = ({ token }: { token: string }) => {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [errorState, setError] = useState({ field: '', message: '' })
    const [changePassword] = useChangePasswordMutation()

    useEffect(() => {
        const errorElement = document.getElementById(errorState.field)
        if (errorElement) {
            errorElement.style.border = "1px solid red"
        }
    }, [errorState])


    return (
        <div>
            <h1 className='font-bold text-center text-xl'>Change Password</h1>
            <form
                className='flex flex-col gap-[10px]'
                onSubmit={async (e) => {
                    e.preventDefault()
                    const response = await changePassword({
                        variables: { newPassword: password, token }, update(cache, { data }) {
                            if (data?.changePassword) {
                                cache.writeQuery<MeQuery>({
                                    query: MeDocument,
                                    data: { me: data.changePassword.user }
                                })
                            }
                        }
                    })
                    if (response.data?.changePassword.errors) {
                        const fieldName = response.data.changePassword.errors
                        const errorMap = toErrorMap(fieldName)
                        setError(prev => ({
                            ...prev,
                            field: Object.keys(errorMap)[0],
                            message: errorMap[Object.keys(errorMap)[0]]
                        }))
                    } else if (response.data?.changePassword.user) {
                        router.push('/')
                    }
                }
                }
            >
                <label htmlFor='newPassword'>New Password
                    <input id="newPassword" type="password" name="newPassword" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </label>
                {errorState.field === "newPassword" && <p className='text-red-500'>{errorState.message}</p>}

                <button type="submit" className='bg-blue-500  w-[5rem] rounded-xl p-1 text-white'>Change Password</button>
            </form>
        </div>
    )
}


ChangePassword.getInitialProps = ({ query }) => ({
    token: query.token as string
})


export default ChangePassword