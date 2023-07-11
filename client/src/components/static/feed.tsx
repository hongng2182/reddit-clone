import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
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
        link: '/static'
    },
    {
        icon: 'arrow',
        name: 'Popular',
        link: 'static/r/popular'
    }],
}

const constants = [
    {
        title: 'YOUR COMMUNITIES',
        sub_feed: [{
            icon: 'add',
            name: 'Create Community',
            link: null
        }],
        communities: [{
            imgSrc: 'https://i.pinimg.com/originals/0f/a8/cb/0fa8cb6ebfa7c2ca5e3e229129ba85f3.png',
            name: 'community'
        }]
    },
    {
        title: 'OTHER',
        sub_feed: [{
            icon: 'add',
            name: 'Create Post',
            link: '/static/submit'
        }],
    }]

function Feed({ isUserLogIn }: { isUserLogIn: boolean }) {
    const [activeTab, setActiveTab] = useState<{
        icon: string,
        name: string
    }>({
        icon: 'arrow',
        name: 'Popular'
    })

    const [showTab, setShowTab] = useState(false)
    const { isOpen, openModal, closeModal } = useModal()
    const router = useRouter()

    return (
        <div className="bg-white relative _995:w-[270px]"
            onMouseEnter={() => setShowTab(true)}
            onMouseLeave={() => setShowTab(false)}
        >
            <div className={`w-full font-bold h-[40px] border hover:border-medium rounded-[4px] p-[5px] flex-between-10 cursor-pointer ${showTab ? 'border-medium' : 'border-transparent'}`}
            >
                <span className='flex-start-10'>
                    <Image
                        alt='img'
                        width='20'
                        height='20'
                        src={activeTab.icon.includes('https://') ? activeTab.icon : `/icons/${activeTab.icon}-fill.svg`}
                        className='img-24'
                    />
                    <span className='_995M:hidden'>{activeTab.name}</span>
                </span>
                <span><DropdownIcon width={20} fill='#000' /></span>
            </div>
            {showTab && <div className={`${isUserLogIn ? 'h-[360px]' : 'h-[150px]'} w-[270px] absolute top-[38px] flex-col-start-10 bg-white border border-medium border-t-0 z-10 overflow-y-scroll`}>
                {/* FEEDS */}
                <h4 className='feed-tab label-sm'>{feeds.title}</h4>
                {feeds.sub_feed.map(item =>
                    <button
                        key={item.name}
                        type='button'
                        className="w-full feed-tab flex-start-10 hover:bg-light cursor-pointer"
                        onClick={() => {
                            setActiveTab(item)
                            router.push(item.link)
                            setShowTab(false)
                        }}
                    >
                        <Image
                            alt='img'
                            width='24'
                            height='24'
                            src={`/icons/${item.icon}-outline.svg`}
                            className='img-24'
                        />
                        <span>{item.name}</span>
                    </button >
                )}
                {/* COMMUNITIES */}
                {isUserLogIn && constants.map(menu =>
                    <div key={menu.title} className='w-full'>
                        <h4 className='feed-tab label-sm'>{menu.title}</h4>
                        {menu.sub_feed.map(item => <button
                            key={item.name}
                            type='button'
                            className="w-full feed-tab flex-start-10 hover:bg-light cursor-pointer"
                            onClick={() => {
                                setActiveTab(item)
                                if (item.name === 'Create Community') { openModal() }
                                else if (item.link) { router.push(item.link) }
                            }}
                        >
                            <Image
                                alt='img'
                                width='24'
                                height='24'
                                src={`/icons/${item.icon}-outline.svg`}
                                className='img-24'
                            />
                            <span>{item.name}</span>
                        </button >)}
                        {menu.communities &&
                            menu.communities.map(community => <button
                                key={community.name}
                                type='button'
                                className="feed-tab w-full flex-start-10 cursor-pointer hover:bg-light"
                                onClick={() => {
                                    setActiveTab({
                                        icon: community.imgSrc,
                                        name: `r/${community.name}`
                                    })
                                    router.push(`/static/r/${community.name}`)
                                }}
                            >
                                <Image
                                    alt='community'
                                    width='0'
                                    height='0'
                                    src={community.imgSrc}
                                    sizes='100%'
                                    className='img-24'
                                />
                                <span>r/{community.name}</span>
                            </button>)
                        }
                    </div>
                )}
            </div>}
            <Modal isOpen={isOpen}
                closeModal={closeModal}
            >
                <CommunityCreatePopup closeModal={closeModal} />
            </Modal>
        </div >
    )
}

export default Feed