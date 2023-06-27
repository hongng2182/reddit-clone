import React, { useState } from 'react'
import Image from 'next/image'
import { useModal } from '@/hooks'
import Modal from './modal'
import { DropdownIcon } from '../icons'
import CommunityCreatePopup from './community-create-popup'

type Feeds = {
    title: string,
    sub_feed:
    { icon: string, name: string, link: string }[],
}

const feeds: Feeds = {
    title: 'FEEDS',
    sub_feed: [{
        icon: 'home',
        name: 'Home',
        link: '/'
    },
    {
        icon: 'arrow',
        name: 'Popular',
        link: '/r/popular'
    }],
}

const constants = [
    {
        title: 'YOUR COMMUNITIES',
        sub_feed: [{
            icon: 'add',
            name: 'Create Community',

        }],
        communities: [{
            imgSrc: '/logo-cat.png',
            name: 'r/community'
        }]
    },
    {
        title: 'OTHER',
        sub_feed: [{
            icon: 'add',
            name: 'Create Post',
            link: '/submit'
        }],
    }]

function Feed() {
    const [activeTab, setActiveTab] = useState<{
        icon: string,
        name: string
    }>({
        icon: 'arrow',
        name: 'Popular'
    })

    const [showTab, setShowTab] = useState(false)
    const { isOpen, openModal, closeModal } = useModal()


    return (
        <div className="bg-white relative _995:w-[270px]">
            <div className={`w-full font-bold h-[40px] border hover:border-medium rounded-[4px] p-[5px] flex-between-10 cursor-pointer ${showTab ? 'border-medium' : 'border-transparent'}`}
                onClick={() => setShowTab(!showTab)}
            >
                <span className='flex-start-10'>
                    <Image
                        alt='img'
                        width='20'
                        height='20'
                        src={`/icons/${activeTab.icon}-fill.svg`}
                        className='min-w-[20px]'
                    />
                    <span className='_995M:hidden'>{activeTab.name}</span>
                </span>
                <span><DropdownIcon width={20} fill='#000' /></span>
            </div>
            {showTab && <div className="w-[270px] absolute top-[38px] h-[400px] flex-col-start-10 bg-white border border-medium border-t-0 z-0 overflow-y-scroll">
                {/* FEEDS */}
                <h4 className='feed-tab label-sm'>{feeds.title}</h4>
                {feeds.sub_feed.map(item =>
                    <button
                        type='button'
                        className="w-full feed-tab flex-start-10 hover:bg-light cursor-pointer"
                        onClick={() => {
                            setActiveTab(item)
                            setShowTab(false)
                        }}
                    >
                        <Image
                            alt='img'
                            width='20'
                            height='20'
                            src={`/icons/${item.icon}-outline.svg`}
                        />
                        <span>{item.name}</span>
                    </button >
                )}
                {/* COMMUNITIES */}
                {constants.map(menu =>
                    <>
                        <h4 className='feed-tab label-sm'>{menu.title}</h4>
                        {menu.sub_feed.map(item => <button
                            type='button'
                            className="w-full feed-tab flex-start-10 hover:bg-light cursor-pointer"
                            onClick={() => {
                                setActiveTab(item)
                                setShowTab(false)
                                if (item.name === 'Create Community') openModal()
                            }}
                        >
                            <Image
                                alt='img'
                                width='20'
                                height='20'
                                src={`/icons/${item.icon}-outline.svg`}
                            />
                            <span>{item.name}</span>
                        </button >)}
                        {menu.communities &&
                            menu.communities.map(community => <button
                                type='button'
                                className="feed-tab w-full flex-start-10 cursor-pointer hover:bg-light"
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
                                <span>{community.name}</span>
                            </button>)
                        }
                    </>
                )}
            </div>}
            <Modal isOpen={isOpen}
                closeModal={closeModal}
                modalContent={<CommunityCreatePopup closeModal={closeModal} />}
            />
        </div >
    )
}

export default Feed