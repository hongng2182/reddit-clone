/* eslint-disable react/function-component-definition */
import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { MeDocument, MeQuery, useChangePasswordMutation } from '@/generated/graphql'
import { toErrorMap } from '@/utils'
import { PageContainer } from '@/components'
import { useGlobalState } from '@/hooks'
import { setShowSignInModal } from '@/action'
import { LoadingIcon } from '@/components/icons'


const ChangePassword: NextPage = () => {
    const router = useRouter()
    const { dispatch } = useGlobalState()
    const [password, setPassword] = useState('')
    const [errorState, setError] = useState<{ [key: string]: string }>({})
    const [changePassword, { loading }] = useChangePasswordMutation()

    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError({})
        const response = await changePassword({
            variables: { newPassword: password, token: typeof router.query.token === "string" ? router.query.token : '' }, update(cache, { data }) {
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
            setError(errorMap)
        } else if (response.data?.changePassword.user) {
            router.push('/')
        }
    }
    return (
        <PageContainer>
            <div className='white-gray-rounded py-[2rem] my-[30px] sm:w-[500px] w-[85%] mx-auto'>
                <h1 className='text-center'>Change Your Password</h1>
                <form
                    className='flex-col-start-10 mt-[1rem] sm:w-[350px] mx-auto'
                    onSubmit={(e) => handleChangePassword(e)}
                >
                    <p className='text-gray text-md' > Enter your new password
                    </p>
                    <div className='w-full'>
                        <div
                            id="newPassword"
                            className={`${errorState.newPassword ? 'border-error' : 'border-transparent'} border bg-light  hover:border-medium rounded-3xl py-1 px-3`}
                        >
                            <input type="password" name="newPassword"
                                className='w-full'
                                value={password}
                                onChange={(e) => {
                                    setError({})
                                    setPassword(e.target.value)
                                }} />
                        </div>
                        {errorState.newPassword && <p className='text-error text-sm pl-3'>{errorState.newPassword}</p>}
                    </div>
                    {errorState.token &&
                        <>
                            <p className='text-error'>{errorState.token}</p>
                            <button type="button" onClick={() => {
                                router.push('/')
                                dispatch(setShowSignInModal(true))
                            }} className='button-main'>Click  here to renew your token</button>
                        </>
                    }

                    {!errorState.token && <button type="submit" className='button-main mx-auto'
                        disabled={loading}
                    >{loading ? <LoadingIcon /> : 'Change Password'}</button>}
                </form>
            </div>
        </PageContainer>
    )
}

export default ChangePassword