import React, { useState } from 'react'
import { useUserAuth } from '@/hooks'
import { LoadingIcon } from './icons'


function AuthenticatePopup() {
    // React hooks
    const [active, setActive] = useState<'login' | 'signup' | 'forgot'>('login')

    // Custom hooks
    const { errorState, setError, handleLogIn, handleRegister, handleForgotPassword, formRef, registerLoading, logInloading, forgotPasswordData, resetPasswordLoading } = useUserAuth()

    // Utils
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        formRef.current = {
            ...formRef.current,
            [name]: value
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
                        ? <>By continuing, you are setting up a MiniReddit account and agree to our <span className='link'>User Agreement</span> and <span className='link'>Privacy Policy.</span></>
                        :
                        <>Tell us your email address associated with your MiniReddit account, and we&apos;ll send you an email with a link to reset your password.</>
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
                        {logInloading ? <LoadingIcon /> : 'Log In'}
                    </button>
                </>}
                {/* Button Sign Up */}
                {active === 'signup' &&
                    <button className='button-main w-full py-2' type='button'
                        disabled={registerLoading}
                        onClick={handleRegister}>
                        {registerLoading ? <LoadingIcon /> : 'Sign Up'}
                    </button>
                }
                {/* Button Reset Password */}
                {active === 'forgot' &&
                    <>
                        <button className='button-main w-full py-2' type='button'
                            disabled={resetPasswordLoading}
                            onClick={handleForgotPassword}>
                            {resetPasswordLoading ? <LoadingIcon /> : 'Reset Password'}
                        </button>

                        {/* Forgot Password Message */}
                        {forgotPasswordData?.forgotPassword.message && <p className='text-success text-sm pl-3'>{forgotPasswordData?.forgotPassword.message}</p>}

                        <p className='text-sm'>Don&apos;t have an email or need assistance logging in? <span className='link underline'>Get Help</span>
                        </p>
                    </>
                }

                {/* Footer */}
                {active === 'login' && <p className='text-sm'> New to MiniReddit? <button type='button' className='link underline'
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