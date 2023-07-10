import React from 'react'
import Image from 'next/image'
import { CommunityInfo } from '@/types'

type Props = {
    communityInfo: CommunityInfo,
    userId: number | undefined
}

function CommunityBanner({ communityInfo, userId }: Props) {
    const { communityIconUrl, name, hasJoined, creatorId } = communityInfo
    const capitalizeName = name[0].toUpperCase() + name.slice(1,)
    const isMod = userId === creatorId

    const handleJoinLeave = () => {
        if (!userId) {// show popup login} 
        }
        // if user haJoined => leave

        // hasnt join, join
    }

    return (
        <div className='h-[250px]'>
            <div className='h-[150px] bg-primary' />
            <div className='h-[90px] bg-white'>
                <div className='main-container relative bg-slate-400'>
                    <div className="absolute  top-[-16px] left-0  flex-start-10" >
                        <div className='w-[80px] h-[80px] rounded-full bg-slate-600 border-4 border-white'>
                            <Image
                                height='0'
                                width='0'
                                src={communityIconUrl}
                                alt='logo'
                                sizes='100%'
                                className='w-full h-full rounded-full'
                            />
                        </div>
                        <div className='mt-[20px] flex-col-start'>
                            <div className='flex-start gap-[20px]'>
                                <h1>{capitalizeName}</h1>
                                <button type="button" disabled={isMod} className={`${hasJoined ? 'button-main-outline after:content-["Joined"] hover:after:content-["Leave"]' : 'button-main'}`}
                                    onClick={handleJoinLeave}
                                >{hasJoined ? "" : "Join"}</button>
                            </div>
                            <span className='label-sm'>r/{name}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommunityBanner