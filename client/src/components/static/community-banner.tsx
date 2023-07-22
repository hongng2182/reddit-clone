import React from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { CommunityInfo } from '@/types'
import { useGlobalState } from '@/hooks'
import { CommunityDocument, UserCommunitiesDocument, useJoinCommunityMutation, useLeaveCommunityMutation } from '@/generated/graphql'
import { setShowSignInModal } from '@/action'
import { defaultCommunityIcon } from '@/lib/constants'

type Props = {
    communityInfo: CommunityInfo,
    userId: number | undefined
}

function CommunityBanner({ communityInfo, userId }: Props) {
    const { communityIconUrl, name, hasJoined, creatorId, displayName } = communityInfo
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
                        hasJoined: true,
                        numMembers: joinedData.numMembers
                    }
                }))
            }
        },
        // For feed nav
        refetchQueries: [
            { query: UserCommunitiesDocument }
        ]
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
        },
        refetchQueries: [
            { query: UserCommunitiesDocument }
        ]
    })
    const isMod = userId === creatorId

    const handleJoinLeave = async () => {
        if (!userId) {
            dispatch(setShowSignInModal(true))
            return
        }
        if (hasJoined) {
            const response = await leaveCommunity({
                variables: { communityName: name }
            })
            if (response.data?.leaveCommunity.community) {
                toast.success(`Successfully leave r/${name}`, { position: 'bottom-center' })
            }
        } else {
            const response = await joinCommunity({ variables: { communityName: name } })
            if (response.data?.joinCommunity.community) {
                toast.success(`Successfully join r/${name}`, { position: 'bottom-center' })
            }
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
                                src={communityIconUrl || defaultCommunityIcon}
                                alt='logo'
                                sizes='100%'
                                className='w-full h-full rounded-full'
                            />
                        </div>
                        <div className='mt-[20px] flex-col-start'>
                            <div className='flex-start gap-[20px]'>
                                <h1>{displayName}</h1>
                                <button type="button" disabled={isMod} className={`${hasJoined ? 'button-main-outline after:content-["Joined"] hover:after:content-["Leave"]' : 'button-main'} cursor-pointer disabled:cursor-not-allowed disabled:hover:after:content-["Joined"]`}
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