import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Feed from './feed'
import { DropdownIcon, ProfileIcon, LogOutIcon } from '../icons'
import SearchBar from './search-bar'
import AuthenticatePopup from './authenticate-popup'
import Modal, { useModal } from './modal'

function Header() {
    const [profileFocus, setProfileFocus] = useState(false)
    const { isOpen, openModal, closeModal } = useModal()
    const isLogin = true
    // TODO: click outside to hide search results, feed and profile

    // TODO: click login show popup, username when login

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
                    <Feed />
                </div>
                <div className="flex-[2] flex-start">
                    <SearchBar />
                </div>
            </div>
            <div className="grow-0 flex-end gap-[1.5rem]">
                {!isLogin && <button type="button" className='button-main smM:hidden'
                    onClick={openModal}>Login</button>}
                <div className="relative flex-start gap-[5px] border border-transparent hover:border-medium p-1 rounded-md cursor-pointer"
                    onClick={() => setProfileFocus(!profileFocus)}>
                    {!isLogin && <ProfileIcon type='outline' />}
                    {isLogin && <div className='flex-start gap-[5px] min-w-[30px]'>
                        <Image
                            src='/demo.png'
                            alt='avatar'
                            width='35'
                            height='35'
                            sizes='100%'
                            className='rounded-full w-[35px] h-[35px]' />
                        <span className='label-md smM:hidden'>rosie2182</span>
                    </div>}
                    <DropdownIcon width={12} />
                    {profileFocus && <div className="absolute h-auto bg-white top-[40px] right-0 py-[10px]">
                        <button
                            type='button'
                            className="feed-tab flex-start-10 cursor-pointer hover:bg-light w-[270px]"
                        >
                            <div className='w-[24px] h-[24px]'>
                                <ProfileIcon fill='#212121' type='outline' />
                            </div>
                            <span>My Profile</span>
                        </button>
                        <button
                            type='button'
                            className="feed-tab flex-start-10 cursor-pointer hover:bg-light w-[270px]"
                        >
                            <div className='w-[24px] h-[24px]'>
                                <LogOutIcon />
                            </div>
                            <span>Log In/ Sign Up</span>
                        </button>
                        <button
                            type='button'
                            className="feed-tab flex-start-10 cursor-pointer hover:bg-light w-[270px]"
                        >
                            <div className='w-[24px] h-[24px]'>
                                <LogOutIcon />
                            </div>
                            <span>Log Out</span>
                        </button>
                    </div>}
                </div>
            </div >
        </nav >
        <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            modalContent={<AuthenticatePopup />}
        />
    </>
    )
}

export default Header