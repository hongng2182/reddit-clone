/* eslint-disable react/no-children-prop */
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePopularCommunititiesQuery } from '@/generated/graphql'
import { ArrayOfFive, defaultCommunityIcon } from '@/lib/constants'
import { CommunityBoxSkeleton } from './skeleton'

function PopularCommunity() {
    const { data: communities, loading } = usePopularCommunititiesQuery()

    return (
        <div className='w-full p-2 rounded-2xl bg-light'>
            <h3 className='p-2'>POLULAR COMMUNITIES</h3>
            {loading && ArrayOfFive.map(item => <CommunityBoxSkeleton key={item} />)}
            {communities?.popularCommunitities.map(community => <Link
                href={`/r/${community.communityName}`}
                key={community.communityId}
                className='flex-between cursor-pointer w-full p-2 hover:bg-medium'>
                <div className='flex-start-10'>
                    <Image
                        alt='img'
                        width='0'
                        height='0'
                        sizes='50%'
                        src={community.communityIconUrl || defaultCommunityIcon}
                        className='img-40'
                    />
                    <div className='text-sm'>
                        <p className='font-light'>r/{community.communityName} </p>
                        <span className='text-gray font-light text-xs'>{community.numMembers} members</span>
                    </div>
                </div>
            </Link>)}
        </div>
    )
}

export default PopularCommunity