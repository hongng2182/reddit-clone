import React, { useState } from 'react'
import Image from 'next/image'
import Feed from './feed'
import { DropdownIcon, ProfileIcon, LogOutIcon } from '../icons'
import SearchBar from './search-bar'
import AuthenticatePopup from './authenticate-popup'
import Modal, { useModal } from './modal'

function Header() {
    const [profileFocus, setProfileFocus] = useState(false)
    const { isOpen, openModal, closeModal } = useModal()

    // TODO: click outside to hide search results, feed and profile

    // TODO: click login show popup

    return (<>
        <nav className='flex-start-10 px-[20px] bg-white h-[48px]'>
            <div className="grow-[1] flex gap-[7px] md:gap-[20px]">
                <div className="flex-start-10 min-w-[50px]">
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
                </div>
                <div className="flex-center">
                    <Feed />
                </div>
                <div className="flex-[2] flex-start">
                    <SearchBar />
                </div>
            </div>
            <div className="grow-0 flex-end gap-[1.5rem]">
                <button type="button" className='button-main smM:hidden'
                    onClick={openModal}>Login</button>
                <div className="relative flex-start-10 border border-transparent hover:border-medium p-1 rounded-md cursor-pointer"
                    onClick={() => setProfileFocus(!profileFocus)}>
                    <ProfileIcon />
                    <DropdownIcon width={12} />
                    {profileFocus && <div className="absolute h-auto bg-white top-[40px] right-0 py-[10px]">
                        <button
                            type='button'
                            className="feed-tab flex-start-10 cursor-pointer hover:bg-light w-[270px]"
                        >
                            <div className='w-[24px] h-[24px]'>
                                <ProfileIcon fill='#212121' />
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
            </div>
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