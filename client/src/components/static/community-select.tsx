import React, { useState } from 'react'
import Image from 'next/image'
import { DropdownIcon } from '@/components/icons'
import { useModal } from '@/hooks'
import { communities_mockup } from '@/mockup'
import CommunityCreatePopup from './community-create-popup'
import Modal from './modal'

function CommunitySelect() {
    const [activeTab, setActiveTab] = useState<{
        imgSrc: string | null,
        name: string,
        numOfMember: number
    }>({
        imgSrc: null,
        name: 'Choose a community',
        numOfMember: 0
    })
    const [showTab, setShowTab] = useState(false)
    const { isOpen, openModal, closeModal } = useModal()

    return (<div className="bg-white relative w-[300px] z-[1]" >
        <div className={`w-full h-[40px] border border-medium p-[5px] flex-between-10 cursor-pointer ${showTab ? 'border-medium' : 'border-transparent'}`}
            onClick={() => setShowTab(!showTab)}
        >
            <div className='flex-start-10'>
                {activeTab.imgSrc ? <Image
                    alt='community'
                    width='0'
                    height='0'
                    src={activeTab.imgSrc}
                    sizes='100%'
                    className='w-[20px] rounded-full'
                /> : <span className='w-[20px] h-[20px] border border-dashed rounded-full' />}
                <span>{activeTab.name}</span>
            </div>
            <span><DropdownIcon width={14} fill='#7C7C7C' /></span>
        </div>
        {
            showTab && <div className="w-[300px] absolute top-[40px] max-h-[300px] flex-col-start-10 bg-white border border-medium border-t-0 z-0 overflow-y-scroll">
                {/* COMMUNITIES LIST */}
                <div className="flex-between w-full pt-2">
                    <h4 className='label-sm pl-[15px] w-full'>YOUR COMMUNITITES</h4>
                    <button type='button'
                        className="button-hover text-xs w-[150px]"
                        onClick={() => {
                            openModal()
                            setShowTab(false)
                        }}
                    >Create New</button>
                </div>
                {communities_mockup.map(community => <button
                    type='button'
                    className="feed-tab w-full flex-start-10 cursor-pointer"
                    onClick={() => {
                        setActiveTab(community)
                        setShowTab(false)
                    }}
                >
                    <div className='w-[24px] h-[24px]'>
                        <Image
                            alt='community'
                            width='0'
                            height='0'
                            src={community.imgSrc}
                            sizes='100%'
                            className='w-[24px] rounded-full'
                        />
                    </div>
                    <div className="flex flex-col items-start text-sm">
                        <span className='font-bold'>{community.name}</span>
                        <span className='text-gray'>{community.numOfMember} members</span>
                    </div>
                </button>)}
            </div>
        }
        <Modal isOpen={isOpen}
            closeModal={closeModal}
        >
            <CommunityCreatePopup closeModal={closeModal} />
        </Modal>
    </div>
    )
}

export default CommunitySelect