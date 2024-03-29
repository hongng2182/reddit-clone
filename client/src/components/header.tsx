import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useClickOutside, useGlobalState } from '@/hooks'
import { useLogoutMutation, useMeQuery } from '@/generated/graphql'
import { setShowSignInModal } from '@/action'
import { defaultProfileIcon } from '@/lib/constants'
import Feed from './feed'
import { DropdownIcon, ProfileIcon, LogOutIcon } from './icons'
import SearchBar from './search-bar'
import AuthenticatePopup from './authenticate-popup'
import Modal from './modal'

function Header() {
    // React hooks
    const router = useRouter()
    const [profileFocus, setProfileFocus] = useState(false)
    const { dispatch, state: { showSignInModal } } = useGlobalState()

    // Graphql Hooks
    const { data } = useMeQuery()
    const [logout] = useLogoutMutation()

    // Utils
    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const response = await logout()
        if (response.data?.logout) {
            router.reload()
        }
    }

    // Custom hooks
    const { elementRef } = useClickOutside({ onClickComplete: () => setProfileFocus(false) })

    return (<>
        <nav className='flex-start smM:px-[5px] px-[20px] bg-white h-[48px]'>
            {/* Logo + Feed + Searchbar */}
            <div className="grow-[1] flex gap-[7px] md:gap-[20px]">
                <Link href='/' className="flex-start-10 min-w-[37px]">
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
            {/* User Profile Nav */}
            <div className="grow-0 flex-end gap-[1.5rem] sm:min-w-[130px] min-w-[62px]">
                {data?.me === null &&
                    <button type="button" className='button-main smM:hidden'
                        onClick={() => dispatch(setShowSignInModal(true))}>Login</button>}
                <div ref={elementRef} className="relative flex-start gap-[5px] border border-transparent hover:border-medium p-1 rounded-md cursor-pointer min-h-[40px]"
                    onClick={() => setProfileFocus(!profileFocus)}
                >
                    {data?.me === null && <ProfileIcon type='outline' />}
                    {data && data.me && <div className='flex-start gap-[5px] min-w-[30px]'>
                        <Image
                            src={data.me.profileUrl ? data.me.profileUrl : defaultProfileIcon}
                            alt='avatar'
                            width='35'
                            height='35'
                            sizes='100%'
                            className='img-35' />
                        <span className='label-md smM:hidden'>{data.me.username}</span>
                    </div>}
                    {data?.me !== undefined && <DropdownIcon width={12} />}
                    {/* User Profile Nav Dropdown */}
                    {profileFocus && <div className="absolute h-auto bg-white border border-medium top-[40px] right-0 py-[10px]">
                        {data && data.me && <>
                            <Link
                                href={`/user/${data.me.username}`}
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
                        {data?.me === null && <button
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