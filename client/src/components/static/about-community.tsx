import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { CommunityInfo } from '@/types'
import { CalendarIcon } from '../icons'

type Props = {
    communityInfo: CommunityInfo,
    isSubmitPost?: boolean
}

function AboutCommunity({ communityInfo, isSubmitPost }: Props) {
    const router = useRouter()
    const { numMembers, createdAt, description, communityIconUrl, name } = communityInfo
    const dateCreated = new Date(Number(createdAt)).toLocaleDateString('en-US', {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return (
        <div className='w-full mb-3 white-gray-rounded'>
            <p className='p-3 bg-cate-blue text-white font-bold w-full'>About Community</p>
            {isSubmitPost && <div className="flex-start-10 px-3 pt-3">
                <Image
                    alt='community-icon'
                    width='0'
                    height='0'
                    sizes='100%'
                    src={communityIconUrl}
                    className='img-40 border border-medium'
                />
                <span className='text-base font-bold'>r/{name}</span>
            </div>}
            <div className='pt-3 flex-col-start-10 mx-auto w-[90%]'>
                <div className="">{description}</div>
                <div className='flex-start-10 text-gray'>
                    <CalendarIcon />
                    Created {dateCreated}
                </div>
                <div className='h-[1px] w-full bg-medium' />
                <div className='flex-col-center-10 w-full'>
                    <p>{numMembers}</p>
                    <p>Members</p>
                </div>
                <div className='h-[1px] w-full bg-medium' />
                {!isSubmitPost && <button type="button"
                    className='button-main w-full mt-2 mb-4'
                    onClick={() => router.push(`${router.asPath}/submit`)}
                >Create Post</button>}
            </div>
        </div>
    )
}

AboutCommunity.defaultProps = {
    isSubmitPost: false
}

export default AboutCommunity