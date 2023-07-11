import React from 'react'
import Image from 'next/image'
import { CommunityInfo } from '@/types'
import { useGlobalState } from '@/hooks'
import { CommunityDocument, useJoinCommunityMutation, useLeaveCommunityMutation } from '@/generated/graphql'
import { setShowSignInModal } from '@/action'

type Props = {
    communityInfo: CommunityInfo,
    userId: number | undefined
}

function CommunityBanner({ communityInfo, userId }: Props) {
    const { communityIconUrl, name, hasJoined, creatorId } = communityInfo
    const { dispatch } = useGlobalState()
    const [joinCommunity] = useJoinCommunityMutation({
        update(cache, { data }) {
            const joinedData = data?.joinCommunity.community
            if (joinedData) {
                cache.updateQuery({
                    query: CommunityDocument,
                    variables: { communityName: name }
                }, (cacheData) => ({
                    community: {
                        ...cacheData.community,
                        hasJoined: joinedData.hasJoined,
                        numMembers: joinedData.numMembers
                    }
                }))
            }
        }
    })
    const [leaveCommunity] = useLeaveCommunityMutation({
        update(cache, { data }) {
            const leaveData = data?.leaveCommunity.community
            if (leaveData) {
                cache.updateQuery({
                    query: CommunityDocument,
                    variables: { communityName: name }
                }, (cacheData) => ({
                    community: {
                        ...cacheData.community,
                        hasJoined: leaveData.hasJoined,
                        numMembers: leaveData.numMembers
                    }
                }))
            }
        }
    })
    const capitalizeName = name[0].toUpperCase() + name.slice(1,)
    const isMod = userId === creatorId

    const handleJoinLeave = () => {
        if (!userId) {
            dispatch(setShowSignInModal(true))
            return
        }
        if (hasJoined) {
            leaveCommunity({
                variables: { communityName: name }
            })
            // toast successfully join r/...
        } else {
            joinCommunity({ variables: { communityName: name } })
            // toast successfully left r/...
        }
    }

    return (
        <div className='h-[250px]'>
            <div className='h-[150px] bg-primary' />
            <div className='h-[90px] bg-white'>
                <div className='main-container relative bg-slate-400'>
                    <div className="absolute  top-[-16px] left-0  flex-start-10" >
                        <div className='w-[80px] h-[80px] rounded-full bg-medium border-4 border-white'>
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