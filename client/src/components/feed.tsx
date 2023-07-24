/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useClickOutside, useGlobalState, useModal } from '@/hooks'
import { useUserCommunitiesQuery } from '@/generated/graphql'
import { defaultCommunityIcon, feeds, tabs } from '@/lib/constants'
import { setActiveFeedTab } from '@/action'
import { FeedTab } from '@/types'
import Modal from './modal'
import { DropdownIcon } from './icons'
import CommunityCreatePopup from './community-create-popup'

type TabProps = {
    handleClick: () => void,
    imgSrc: string,
    name: string,
    isActive: boolean
}

function Feed({ isUserLogIn }: { isUserLogIn: boolean }) {
    const { state: { activeFeedTab }, dispatch } = useGlobalState()

    const setActiveTab = (value: FeedTab) => {
        dispatch(setActiveFeedTab(value))
    }

    // React hooks
    const [showTab, setShowTab] = useState(false)
    const { isOpen, openModal, closeModal } = useModal()
    const router = useRouter()

    // GraphQL hooks
    const { data } = useUserCommunitiesQuery()
    const moderatingCommunities = data?.userCommunities?.filter(community => community.isModerator)

    const { elementRef } = useClickOutside({ onClickComplete: () => setShowTab(false) })

    return (<>
        <div ref={elementRef} className="bg-white relative _995:w-[270px]"
            onClick={() => setShowTab(!showTab)}
        >
            <div className={`w-full font-bold h-[40px] border hover:border-medium rounded-[4px] p-[5px] flex-between-10 cursor-pointer ${showTab ? 'border-medium' : 'border-transparent'}`}
            >
                <span className='flex-start-10 ml-2'>
                    <Image
                        alt='img'
                        width='20'
                        height='20'
                        src={activeFeedTab.iconFill || activeFeedTab.icon}
                        className='img-24'
                    />
                    <span className='_995M:hidden'>{activeFeedTab.name}</span>
                </span>
                <span><DropdownIcon width={20} fill='#000' /></span>
            </div>
            {showTab && <div className={`${isUserLogIn ? 'h-[360px]' : 'h-[150px]'} w-[270px] absolute top-[38px] flex-col-start-10 bg-white border border-medium border-t-0 z-10 overflow-y-scroll`}>
                {/* MODERATING */}
                {moderatingCommunities && moderatingCommunities.length > 0 && <>
                    <h4 className='feed-tab label-sm'>MODERATING</h4>{moderatingCommunities.map(item =>
                        <Tab key={item.community.name}
                            handleClick={() => {
                                setActiveTab({
                                    icon: item.community.communityIconUrl || defaultCommunityIcon,
                                    iconFill: null,
                                    name: `r/${item.community.name}`
                                })
                                setShowTab(false)
                                router.push(`/r/${item.community.name}`)
                            }}
                            imgSrc={item.community.communityIconUrl || defaultCommunityIcon}
                            name={`r/${item.community.name}`}
                            isActive={false} />)}
                </>}
                {/* COMMUNITIES */}
                {isUserLogIn && <>
                    <h4 className='feed-tab label-sm'>YOUR COMMUNITIES</h4>
                    <Tab
                        handleClick={() => {
                            setActiveTab(tabs.createCommunity)
                            openModal()
                            setShowTab(false)
                        }}
                        imgSrc={tabs.createCommunity.icon}
                        name={tabs.createCommunity.name}
                        isActive={activeFeedTab.name === tabs.createCommunity.name} />
                    {data?.userCommunities &&
                        data?.userCommunities.map(item => <Tab key={item.community.name}
                            handleClick={() => {
                                setActiveTab({
                                    icon: item.community.communityIconUrl || defaultCommunityIcon,
                                    iconFill: null,
                                    name: `r/${item.community.name}`
                                })
                                setShowTab(false)
                                router.push(`/r/${item.community.name}`)
                            }}
                            imgSrc={item.community.communityIconUrl || defaultCommunityIcon}
                            name={`r/${item.community.name}`}
                            isActive={false} />)
                    }
                </>}
                {/* FEEDS */}
                <h4 className='feed-tab label-sm'>{feeds.title}</h4>
                {feeds.sub_feed.map(item =>
                    <Tab key={item.name}
                        handleClick={() => {
                            setShowTab(false)
                            setActiveTab(item)
                            router.push(item.link)
                        }}
                        imgSrc={activeFeedTab.name === item.name ? item.iconFill : item.icon}
                        name={item.name}
                        isActive={activeFeedTab.name === item.name} />)}
                {/* OTHER */}
                {isUserLogIn && <>
                    <h4 className='feed-tab label-sm'>OTHER</h4>
                    <Tab
                        handleClick={() => {
                            setActiveTab(tabs.createPost)
                            router.push('/submit')
                        }}
                        imgSrc={tabs.createPost.icon}
                        name={tabs.createPost.name}
                        isActive={activeFeedTab.name === tabs.createPost.name} />
                </>}
            </div>}
        </div >
        <Modal isOpen={isOpen}
            closeModal={closeModal}
        >
            <CommunityCreatePopup closeModal={closeModal} />
        </Modal>
    </>
    )
}
export default Feed


function Tab({ handleClick, imgSrc, name, isActive }: TabProps) {
    return <button
        type='button'
        className="w-full feed-tab flex-start-10 hover:bg-light cursor-pointer"
        onClick={handleClick}
    >
        <Image
            alt='img'
            width='24'
            height='24'
            src={imgSrc}
            className='img-24'
        />
        <span className={isActive ? 'font-bold' : ''}>{name}</span>
    </button >
}