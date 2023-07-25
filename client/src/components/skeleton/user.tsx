import React from 'react'
import { CommunityBoxSkeleton } from './community'

function UserInfoSkeleton() {
    return (<>
        <div className='border border-light-gray w-full rounded'>
            <div className='h-[70px] w-full bg-medium' />
            <div className='bg-white pt-[30px] p-3 animate-pulse space-y-3 relative'>
                <div className='img-80 bg-medium absolute top-[-50px] border-2 border-white' />
                <div className='h-[17px] w-[50%] bg-medium rounded' />
                <div className='space-y-2'>
                    <div className='mx-auto h-[20px] w-1/3 bg-medium' />
                    <div className='mx-auto h-[20px] w-2/3 bg-medium' />
                </div>
                <div className='h-[25px] w-3/4 mx-auto bg-medium rounded-full' />
            </div>
        </div>
        <div className='w-full'>
            <CommunityBoxSkeleton />
            <CommunityBoxSkeleton />
            <CommunityBoxSkeleton />
        </div>
    </>
    )
}

export default UserInfoSkeleton