import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { MeDocument, MeQuery, useForgotPasswordMutation, useLoginMutation, useRegisterMutation } from '@/generated/graphql'
import { toErrorMap } from '@/utils'
import { initializeApollo } from '@/lib/apolloClient'
import { useGlobalState } from '@/hooks'
import { setShowSignInModal } from '@/action'

function AuthenticatePopup() {
    // React hooks
    const [active, setActive] = useState<'login' | 'signup' | 'forgot'>('login')
    const router = useRouter()
    const formRef = useRef({ username: '', password: '', email: '', usernameOrEmail: '' })
    const [errorState, setError] = useState<{ [key: string]: string }>({})

    // Created hooks
    const { dispatch } = useGlobalState()

    // GraphQL hooks
    const [register, { loading: registerLoading }] = useRegisterMutation()
    const [login, { loading: logInloading }] = useLoginMutation()
    const [forgotPassword, { data: forgotPasswordData }] = useForgotPasswordMutation()

    // Utils
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        formRef.current = {
            ...formRef.current,
            [name]: value
        }
    }

    // handleRegister
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
            router.push('/static')
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

    return (
        <div className='w-[380px] h-[500px] my-7'>
            <div className='flex flex-col items-start justify-center gap-[20px] w-[320px] mx-auto'>
                {/* Title */}
                <h2>
                    {active === 'login' && 'Log In'}
                    {active === 'signup' && 'Sign Up'}
                    {active === 'forgot' && 'Reset your password'}
                </h2>
                {/* Instruction */}
                <p className='text-sm'>
                    {active !== 'forgot'
                        ? <>By continuing, you are setting up a Reddit account and agree to our <span className='link'>User Agreement</span> and <span className='link'>Privacy Policy.</span></>
                        :
                        <>Tell us your email address associated with your Reddit account, and we&apos;ll send you an email with a link to reset your password.</>
                    }</p>
                {/* Email input */}
                {active !== 'login' &&
                    <div className='w-full'>
                        <div
                            id='email'
                            className={`${errorState.email ? 'border-error' : 'border-transparent'} border bg-light  hover:border-medium rounded-3xl py-1 px-3`}
                        >
                            <input name="email" type="email" placeholder='Email'
                                onChange={(e) => handleChange(e)}
                                className='border-none w-full p-1'
                            />
                        </div>
                        {errorState.email && <p className='text-error text-sm pl-3'>{errorState.email}</p>}
                    </div>}
                {/* Username or Email input */}
                {active !== 'forgot' && <>
                    <div className="w-full">
                        <div
                            id={`${active === 'login' ? 'usernameOrEmail' : 'username'}`}
                            className={`${errorState.usernameOrEmail || errorState.username ? 'border-error' : 'border-transparent'} w-full border bg-light hover:border-medium rounded-3xl py-1 px-3`}
                        >
                            <input name={`${active === 'login' ? 'usernameOrEmail' : 'username'}`}
                                type="text"
                                placeholder={`${active === 'login' ? 'Username Or Email' : 'Username'}`}
                                onChange={(e) => handleChange(e)} className='border-none w-full p-1'
                            />
                        </div>
                        {errorState.username && <p className='text-error p-3 text-sm'>{errorState.username}</p>}
                        {errorState.usernameOrEmail && <p className='text-error p-3 text-sm'>{errorState.usernameOrEmail}</p>}
                    </div>
                    {/* Password input */}
                    <div className="w-full">
                        <div
                            id='password'
                            className={`${errorState.password ? 'border-error' : 'border-transparent'} w-full border bg-light hover:border-medium rounded-3xl py-1 px-3`}
                        >
                            <input name="password" type="password" placeholder='Password' className='border-none w-full p-1'
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        {errorState.password && <p className='text-error text-sm pl-3'>{errorState.password}</p>}
                    </div>
                </>}
                {/* Errors */}
                {/* Button Login */}
                {active === 'login' && <>
                    <button type='button' className='text-sm link underline'
                        onClick={() => {
                            setActive('forgot')
                            setError({})
                        }}
                    >Forgot your password?</button>
                    <button onClick={handleLogIn}
                        disabled={logInloading}
                        className='button-main w-full py-2' type='button'>
                        {logInloading ? 'Login Loading' : 'Log In'}
                    </button>
                </>}
                {/* Button Sign Up */}
                {active === 'signup' &&
                    <button className='button-main w-full py-2' type='button'
                        disabled={registerLoading}
                        onClick={handleRegister}>
                        {registerLoading ? 'Register Loading' : 'Sign Up'}
                    </button>
                }
                {/* Button Reset Password */}
                {active === 'forgot' &&
                    <>
                        <button className='button-main w-full py-2' type='button'
                            onClick={handleForgotPassword}>
                            Reset Password
                        </button>

                        {/* Forgot Password Message */}
                        {forgotPasswordData?.forgotPassword.message && <p className='text-success text-sm pl-3'>{forgotPasswordData?.forgotPassword.message}</p>}

                        <p className='text-sm'>Don&apos;t have an email or need assistance logging in? <span className='link underline'>Get Help</span>
                        </p>
                    </>
                }

                {/* Footer */}
                {active === 'login' && <p className='text-sm'>New to Reddit? <button type='button' className='link underline'
                    onClick={() => {
                        setActive('signup')
                        setError({})
                    }}>Sign up</button></p>}
                {active === 'signup' && <p className='text-sm'>Already a redditor? <button type='button' className='link underline' onClick={() => {
                    setActive('login')
                    setError({})
                }}>Log In</button></p>}
                {active === 'forgot' && <div className='flex gap-[10px] text-primary text-sm'>
                    <button type='button' className='link underline' onClick={() => {
                        setActive('signup')
                        setError({})
                    }}>Sign up</button> •
                    <button type='button' className='link underline' onClick={() => {
                        setActive('login')
                        setError({})
                    }}>Log In</button>
                </div>}
            </div>
        </div >
    )
}

export default AuthenticatePopup