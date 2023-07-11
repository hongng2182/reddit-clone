import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { MeDocument, MeQuery, useForgotPasswordMutation, useLoginMutation, useRegisterMutation } from '@/generated/graphql'
import { toErrorMap } from '@/utils'
import { initializeApollo } from '@/lib/apolloClient'

function AuthenticatePopup({ closeModal }: { closeModal: () => void }) {
    const [active, setActive] = useState<'login' | 'signup' | 'forgot'>('login')

    // TODO: handle login function and error, limit username character
    const router = useRouter()
    const formRef = useRef({ username: '', password: '', email: '', usernameOrEmail: '' })
    const [register, { loading: registerLoading }] = useRegisterMutation()
    const [login, { loading: logInloading }] = useLoginMutation()
    const [forgotPassword] = useForgotPasswordMutation()


    const [errorState, setError] = useState({ field: '', message: '' })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        formRef.current = {
            ...formRef.current,
            [name]: value
        }
    }

    useEffect(() => {
        const errorElement = document.getElementById(errorState.field)
        if (errorElement) {
            errorElement.style.border = "1px solid red"
        }
    }, [errorState])

    const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
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
            setError(prev => ({
                ...prev,
                field: Object.keys(errorMap)[0],
                message: errorMap[Object.keys(errorMap)[0]]
            }))
        } else if (response.data?.register.user) {
            router.push('/')
        }
    }

    const handleLogIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
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
            setError(prev => ({
                ...prev,
                field: Object.keys(errorMap)[0],
                message: errorMap[Object.keys(errorMap)[0]]
            }))
        } else if (response.data?.login.user) {
            const apolloClient = initializeApollo()
            await apolloClient.resetStore()
            closeModal()
        }
    }
    const handleForgotPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await forgotPassword({
            variables: { email: formRef.current.email }
        })
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
                {active !== 'login' && <div
                    className='w-full border bg-light border-transparent hover:border-medium rounded-3xl py-1 px-3'
                >
                    <input name="email" id='email' type="email" placeholder='Email'
                        onChange={(e) => handleChange(e)}
                        className='border-none w-full p-1'
                    />
                    {errorState.field === "email" && <p className='text-red-500'>{errorState.message}</p>}
                </div>}
                {/* Username or Email input */}
                {active !== 'forgot' && <>
                    <div
                        className='w-full border bg-light border-transparent hover:border-medium rounded-3xl py-1 px-3'
                    >
                        <input name={`${active === 'login' ? 'usernameOrEmail' : 'username'}`}
                            id='username' type="text"
                            placeholder={`${active === 'login' ? 'Username Or Email' : 'Username'}`}
                            onChange={(e) => handleChange(e)} className='border-none w-full p-1'
                        />
                        {errorState.field === "username" && <p className='text-red-500'>{errorState.message}</p>}
                    </div>
                    {/* Password input */}
                    <div
                        className='w-full border bg-light border-transparent hover:border-medium rounded-3xl py-1 px-3'
                    >
                        <input name="password" id='password' type="password" placeholder='Password' className='border-none w-full p-1'
                            onChange={(e) => handleChange(e)}
                        />
                        {errorState.field === "password" && <p className='text-red-500'>{errorState.message}</p>}
                    </div>
                </>
                }
                {/* Button Login */}
                {active === 'login' && <>
                    <button type='button' className='text-sm link underline'
                        onClick={() => setActive('forgot')}
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
                        <p className='text-sm'>Don&apos;t have an email or need assistance logging in? <span className='link underline'>Get Help</span>
                        </p>
                    </>
                }

                {/* Footer */}
                {active === 'login' && <p className='text-sm'>New to Reddit? <button type='button' className='link underline' onClick={() => setActive('signup')}>Sign up</button></p>}
                {active === 'signup' && <p className='text-sm'>Already a redditor? <button type='button' className='link underline' onClick={() => setActive('login')}>Log In</button></p>}
                {active === 'forgot' && <div className='flex gap-[10px] text-primary text-sm'>
                    <button type='button' className='link underline' onClick={() => setActive('signup')}>Sign up</button> •
                    <button type='button' className='link underline' onClick={() => setActive('login')}>Log In</button>
                </div>}
            </div>
        </div >
    )
}

export default AuthenticatePopup