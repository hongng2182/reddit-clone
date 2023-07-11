import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useGlobalState } from '@/hooks'
import { useLogoutMutation, useMeQuery } from '@/generated/graphql'
import { setShowSignInModal } from '@/action'
import Feed from './feed'
import { DropdownIcon, ProfileIcon, LogOutIcon } from '../icons'
import SearchBar from './search-bar'
import AuthenticatePopup from './authenticate-popup'
import Modal from './modal'

function Header() {
    const router = useRouter()
    const { data } = useMeQuery()
    const [profileFocus, setProfileFocus] = useState(false)
    const { dispatch, state: { showSignInModal } } = useGlobalState()
    const [logout, { data: logoutData }] = useLogoutMutation()

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        logout()
        if (logoutData?.logout) { router.reload() }
    }

    return (<>
        <nav className='flex-start smM:px-[5px] px-[20px] bg-white h-[48px]'>
            <div className="grow-[1] flex gap-[7px] md:gap-[20px]">
                <Link href='/static' className="flex-start-10 min-w-[37px]">
                    <Image
                        height='0'
                        width='0'
                        src='/logo-cat.png'
                        alt='logo'
                        sizes='100%'
                        className='w-[35px]'
                    />
                    <Image
                        height='40'
                        width='0'
                        src='/logo-text.png'
                        alt='logo'
                        sizes='80%'
                        className='h-auto w-[150px] lgM:hidden'
                    />
                </Link>
                <div className="flex-center">
                    <Feed isUserLogIn={Boolean(data?.me)} />
                </div>
                <div className="flex-[2] flex-start">
                    <SearchBar />
                </div>
            </div>
            <div className="grow-0 flex-end gap-[1.5rem]">
                {!data?.me && <button type="button" className='button-main smM:hidden'
                    onClick={() => dispatch(setShowSignInModal(true))}>Login</button>}
                <div className="relative flex-start gap-[5px] border border-transparent hover:border-medium p-1 rounded-md cursor-pointer min-h-[40px]"
                    onMouseEnter={() => setProfileFocus(true)}
                    onMouseLeave={() => setProfileFocus(false)}
                >
                    {!data?.me && <ProfileIcon type='outline' />}
                    {data && data.me && <div className='flex-start gap-[5px] min-w-[30px]'>
                        <Image
                            src={data.me.profileUrl ? data.me.profileUrl : '/default-profile.jpg'}
                            alt='avatar'
                            width='35'
                            height='35'
                            sizes='100%'
                            className='img-35' />
                        <span className='label-md smM:hidden'>{data.me.username}</span>
                    </div>}
                    <DropdownIcon width={12} />
                    {profileFocus && <div className="absolute h-auto bg-white top-[40px] right-0 py-[10px]">
                        {data && data.me && <><Link
                            href={`/static/user/${data.me.username}`}
                            className="feed-tab flex-start-10 cursor-pointer hover:bg-light w-[270px]"
                        >
                            <div className='w-[24px] h-[24px]'>
                                <ProfileIcon fill='#212121' type='outline' />
                            </div>
                            <span>My Profile</span>
                        </Link>
                            <button
                                type='button'
                                className="feed-tab flex-start-10 cursor-pointer hover:bg-light w-[270px]"
                                onClick={handleLogout}
                            >
                                <div className='w-[24px] h-[24px]'>
                                    <LogOutIcon />
                                </div>
                                <span>Log Out</span>
                            </button>
                        </>}
                        {!data?.me && <button
                            type='button'
                            className="feed-tab flex-start-10 cursor-pointer hover:bg-light w-[270px]"
                            onClick={() => dispatch(setShowSignInModal(true))}
                        >
                            <div className='w-[24px] h-[24px]'>
                                <LogOutIcon />
                            </div>
                            <span>Log In/ Sign Up</span>
                        </button>}
                    </div>}
                </div>
            </div >
        </nav >
        <Modal
            isOpen={showSignInModal}
            closeModal={() => dispatch(setShowSignInModal(false))}>
            <AuthenticatePopup />
        </Modal>
    </>
    )
}

export default Header