import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useModal } from '@/hooks'
import CommunityCreatePopup from './community-create-popup'
import Modal from './modal'

function UserHomeSidebar() {
    const { isOpen, openModal, closeModal } = useModal()

    return (<>
        <div className='white-gray-rounded'>
            <div className="h-[40px] bg-primary w-full" />
            <div className='flex-col-start-10 px-3 py-5'>
                <div className='w-[35px] h-[35px] bg-medium rounded-full flex-start-10'>
                    <Image
                        width='0'
                        height='0'
                        alt='avatar'
                        sizes='100%'
                        src='/logo-cat.png'
                        className='img-35'
                    />
                    <h3>Home</h3>
                </div>
                <p className='text-justify'>Your personal Reddit frontpage. Come here to check in with your favorite communities.</p>
                <div className='w-full h-[1px] bg-medium' />
                <Link href='/static/submit' className='button-main w-full text-center'>Create Post</Link>
                <button type="button" className='button-main-outline w-full'
                    onClick={openModal}>Create Community</button>
            </div>
        </div>
        <Modal isOpen={isOpen}
            closeModal={closeModal}
            modalContent={<CommunityCreatePopup closeModal={closeModal} />}
        />
    </>
    )
}

export default UserHomeSidebar