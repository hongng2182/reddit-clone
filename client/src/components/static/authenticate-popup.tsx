import React, { useState } from 'react'
import { GoogleIcon } from '../icons'

function AuthenticatePopup() {
    const [active, setActive] = useState<'login' | 'signup' | 'forgot'>('login')

    // TODO: handle login function and error

    return (
        <div className='w-[380px] h-[500px] my-7'>
            <div className='flex flex-col items-start justify-center gap-[20px] w-[320px] mx-auto'>
                <h2>
                    {active === 'login' && 'Log In'}
                    {active === 'signup' && 'Sign Up'}
                    {active === 'forgot' && 'Reset your password'}
                </h2>
                <p className='text-sm'>
                    {active !== 'forgot'
                        ? <>By continuing, you are setting up a Reddit account and agree to our <span className='link'>User Agreement</span> and <span className='link'>Privacy Policy.</span></>
                        :
                        <>Tell us your email address associated with your Reddit account, and we&apos;ll send you an email with a link to reset your password.</>
                    }</p>
                {active !== 'forgot' &&
                    <><div
                        className='flex-start gap-[50px] w-full border bg-light border-transparent hover:border-medium hover:bg-primary-light rounded-3xl py-1 px-3 cursor-pointer'
                    >
                        <GoogleIcon />
                        <p className='p-2 text-gray font-bold'>Log In with Google</p>
                    </div>
                        <div className='flex-start h-auto w-full'>
                            <div className='h-[1px] bg-medium w-2/5' />
                            <span className='w-1/5 text-center text-gray font-bold'>OR</span>
                            <div className='h-[1px] bg-medium w-2/5' />
                        </div>
                    </>
                }
                {active !== 'login' && <div
                    className='w-full border bg-light border-transparent hover:border-medium rounded-3xl py-1 px-3'
                >
                    <input name="email" id='email' type="text" placeholder='Email' className='border-none w-full p-1'
                    />
                </div>}

                {active !== 'forgot' && <>
                    <div
                        className='w-full border bg-light border-transparent hover:border-medium rounded-3xl py-1 px-3'
                    >
                        <input name="username" id='username' type="text" placeholder='Username' className='border-none w-full p-1'
                        />
                    </div>
                    <div
                        className='w-full border bg-light border-transparent hover:border-medium rounded-3xl py-1 px-3'
                    >
                        <input name="username" id='password' type="password" placeholder='Password' className='border-none w-full p-1'
                        />
                    </div>
                </>
                }
                {active === 'login' && <>
                    <button type='button' className='text-sm link underline'
                        onClick={() => setActive('forgot')}
                    >Forgot your password?</button>
                    <button className='button-main w-full py-2' type='button'>
                        Log In
                    </button>
                </>}
                {active === 'signup' &&
                    <button className='button-main w-full py-2' type='button'>
                        Sign Up
                    </button>
                }
                {active === 'forgot' &&
                    <>
                        <button className='button-main w-full py-2' type='button'>
                            Reset Password
                        </button>
                        <p className='text-sm'>Don&apos;t have an email or need assistance logging in? <span className='link underline'>Get Help</span>
                        </p>
                    </>
                }
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