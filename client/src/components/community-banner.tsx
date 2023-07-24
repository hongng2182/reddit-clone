import React from 'react'
import Image from 'next/image'
import { CommunityInfo } from '@/types'
import {  useJoinLeaveCommunity } from '@/hooks'
import { defaultCommunityIcon } from '@/lib/constants'

type Props = {
    communityInfo: CommunityInfo,
    userId: number | undefined
}

function CommunityBanner({ communityInfo, userId }: Props) {
    // Props destructuring
    const { communityIconUrl, name, hasJoined, creatorId, displayName } = communityInfo
    const isMod = userId === creatorId

    // Custom hooks
    const { handleJoinLeave } = useJoinLeaveCommunity({ communityName: name })

    return (
        <div className='min-h-[250px] mb-2'>
            <div className='h-[150px] bg-primary' />
            <div className='min-h-[90px] bg-white'>
                <div className='main-container relative'>
                    <div className="absolute top-[-16px] left-0 flex-start-10" >
                        <div className='w-[80px] h-[80px] rounded-full bg-medium border-4 border-white'>
                            <Image
                                height='0'
                                width='0'
                                src={communityIconUrl || defaultCommunityIcon}
                                alt='logo'
                                sizes='100%'
                                className='w-full h-full rounded-full'
                            />
                        </div>
                    </div>
                    <div className='ml-[100px] pt-2 flex-col-start'>
                        <div className='flex-start gap-[20px]'>
                            <h1>{displayName}</h1>
                            <button type="button" disabled={isMod} className={`${hasJoined ? 'button-main-outline after:content-["Joined"] hover:after:content-["Leave"]' : 'button-main'} cursor-pointer disabled:cursor-not-allowed disabled:hover:after:content-["Joined"]`}
                                onClick={() => handleJoinLeave(name, hasJoined, userId)}
                            >{hasJoined ? "" : "Join"}</button>
                        </div>
                        <span className='label-sm'>r/{name}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommunityBanner