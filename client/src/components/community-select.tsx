import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useUserCommunitiesQuery } from '@/generated/graphql'
import { DropdownIcon } from '@/components/icons'
import { useModal } from '@/hooks'
import { CommunityFragment, CommunityInfo } from '@/types'
import { defaultCommunityIcon } from '@/lib/constants'
import CommunityCreatePopup from './community-create-popup'
import Modal from './modal'


const defaultValue: CommunityFragment = {
    __typename: "Community",
    id: 0,
    communityIconUrl: undefined,
    name: 'Choose a community',
    numMembers: 0
}

type Props = {
    onSelectCommunity: (value: number) => void,
    // eslint-disable-next-line react/require-default-props
    initialValue?: Partial<CommunityInfo>
}

function CommunitySelect({ onSelectCommunity, initialValue }: Props) {
    const { data } = useUserCommunitiesQuery()
    const activeTab = useRef<Partial<CommunityInfo>>(initialValue || defaultValue)
    const [showTab, setShowTab] = useState(false)
    const { isOpen, openModal, closeModal } = useModal()

    useEffect(() => {
        if (activeTab.current.id && activeTab.current.id !== 0) {
            onSelectCommunity(activeTab.current.id)
        }
    }, [activeTab.current, onSelectCommunity])

    if (!data?.userCommunities) {
        return <div className='w-[300px] h-[40px] bg-white border border-medium' />
    }
    return (<div className="bg-white relative w-[300px] z-[1]" >
        <div className={`w-full h-[40px] border border-medium p-[5px] flex-between-10 cursor-pointer ${showTab ? 'border-medium' : 'border-transparent'}`}
            onClick={() => setShowTab(!showTab)}
        >
            <div className='flex-start-10 ml-2'>
                {activeTab.current.communityIconUrl !== undefined ? <Image
                    alt='community'
                    width='0'
                    height='0'
                    src={activeTab.current.communityIconUrl || defaultCommunityIcon}
                    sizes='100%'
                    className='img-20'
                /> : <span className='w-[20px] h-[20px] border border-dashed rounded-full' />}
                <span className='font-bold'>{activeTab.current.name}</span>
            </div>
            <span><DropdownIcon width={14} fill='#7C7C7C' /></span>
        </div>
        {
            showTab && !initialValue && <div className="w-[300px] absolute top-[40px] max-h-[300px] flex-col-start-10 bg-white border border-medium border-t-0 z-0 overflow-y-scroll py-2">
                {/* COMMUNITIES LIST */}
                <div className="flex-between w-full py-2">
                    <h4 className='label-sm pl-[15px] w-full'>YOUR COMMUNITITES</h4>
                    <button type='button'
                        className="button-hover text-xs w-[150px]"
                        onClick={() => {
                            openModal()
                            setShowTab(false)
                        }}
                    >Create New</button>
                </div>
                {data.userCommunities.length === 0 && <div className='m-3 flex-col-center-10'>
                    <p className='text-center'>Start joining community to create your own posts</p>
                    <Link href="/r/popular" type="button" className='button-main-outline'>Start now</Link>
                </div>}
                {data.userCommunities.map(communityData => <button
                    key={communityData.community.id}
                    type='button'
                    className="feed-tab w-full flex-start-10 cursor-pointer"
                    onClick={() => {
                        activeTab.current = communityData.community
                        onSelectCommunity(communityData.community.id)
                        setShowTab(false)
                    }}
                >
                    <Image
                        alt='community'
                        width='0'
                        height='0'
                        src={communityData.community.communityIconUrl || defaultCommunityIcon}
                        sizes='100%'
                        className='img-24 border-medium'
                    />
                    <div className="flex flex-col items-start text-sm">
                        <span className='font-bold'>{communityData.community.name}</span>
                        <span className='text-gray'>{communityData.community.numMembers} members</span>
                    </div>
                </button>)}
            </div>
        }
        <Modal isOpen={isOpen}
            closeModal={closeModal}
        >
            <CommunityCreatePopup closeModal={closeModal} />
        </Modal>
    </div >
    )
}

export default CommunitySelect