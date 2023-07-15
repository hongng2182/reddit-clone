import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { DropdownIcon } from '@/components/icons'
import { useModal } from '@/hooks'
import { CommunityFragment, UserCommunities } from '@/types'
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
    communitiesData: UserCommunities,
    setCommunityId: (value: number) => void
}

function CommunitySelect({ communitiesData, setCommunityId }: Props) {
    // community name query in communitiesData => setactive

    const router = useRouter()
    const currentName = router.query.community as string
    const community = communitiesData.filter(item => item.community.name === currentName)
    const initialValue = community.length > 0 ? community[0].community : defaultValue
    const activeTab = useRef<CommunityFragment>(initialValue)
    const [showTab, setShowTab] = useState(false)
    const { isOpen, openModal, closeModal } = useModal()

    return (<div className="bg-white relative w-[300px] z-[1]" >
        <div className={`w-full h-[40px] border border-medium p-[5px] flex-between-10 cursor-pointer ${showTab ? 'border-medium' : 'border-transparent'}`}
            onClick={() => setShowTab(!showTab)}
        >
            <div className='flex-start-10'>
                {activeTab.current.communityIconUrl !== undefined ? <Image
                    alt='community'
                    width='0'
                    height='0'
                    src={activeTab.current.communityIconUrl || defaultCommunityIcon}
                    sizes='100%'
                    className='w-[20px] rounded-full'
                /> : <span className='w-[20px] h-[20px] border border-dashed rounded-full' />}
                <span>{activeTab.current.name}</span>
            </div>
            <span><DropdownIcon width={14} fill='#7C7C7C' /></span>
        </div>
        {
            showTab && <div className="w-[300px] absolute top-[40px] max-h-[300px] flex-col-start-10 bg-white border border-medium border-t-0 z-0 overflow-y-scroll">
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
                {communitiesData.length === 0 && <div className='m-3 flex-col-center-10'>
                    <p className='text-center'>Start joining community to create your own posts</p>
                    <p className='button-main-outline '>Start now</p>
                </div>}
                {communitiesData.map(data => <button
                    key={data.community.id}
                    type='button'
                    className="feed-tab w-full flex-start-10 cursor-pointer"
                    onClick={() => {
                        activeTab.current = data.community
                        setCommunityId(data.community.id)
                        setShowTab(false)
                    }}
                >
                    <div className='w-[24px] h-[24px]'>
                        <Image
                            alt='community'
                            width='0'
                            height='0'
                            src={data.community.communityIconUrl || defaultCommunityIcon}
                            sizes='100%'
                            className='w-[24px] rounded-full'
                        />
                    </div>
                    <div className="flex flex-col items-start text-sm">
                        <span className='font-bold'>{data.community.name}</span>
                        <span className='text-gray'>{data.community.numMembers} members</span>
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