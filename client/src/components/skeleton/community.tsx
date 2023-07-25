import React from 'react'

function CommunityBoxSkeleton() {

    return (<div className='white-gray-rounded p-2'>
        <div className='animate-pulse flex-between space-x-2'>
            <div className='img-40 bg-medium'
            />
            <div className='flex-1 space-y-1'>
                <div className='h-[15px] w-1/3 bg-medium rounded' />
                <div className='h-[30px] bg-medium rounded' />
            </div>
            <div className='bg-medium rounded-full w-[100px] h-[35px]' />
        </div>
    </div>
    )
}

function AboutCommunitySkeleton() {

    return (<div className='border border-light-gray w-full rounded'>
        <div className='h-[30px] w-full bg-medium' />
        <div className='bg-white p-3 animate-pulse space-y-2'>
            <div className='flex items-center rounded space-x-2'>
                <div className='img-35 bg-medium' />
                <div className='flex-1 bg-medium h-[20px]' />
            </div>
            <div className='h-[17px] w-[75%] bg-medium rounded' />
            <div className='h-[17px] w-[90%] bg-medium rounded' />
            <div className='h-[17px] w-[70%] bg-medium rounded' />
            <div className='space-y-1'>
                <div className='mx-auto h-[12px] w-[30px] bg-medium' />
                <div className='mx-auto h-[19px] w-[60px] bg-medium' />
            </div>
            <div className='h-[25px] bg-medium rounded' />
        </div>
    </div>
    )
}

function CommunityBannerSkeleton() {

    return (<div className='min-h-[250px]'>
        <div className='h-[150px] bg-primary' />
        <div className='min-h-[90px] bg-white'>
            <div className='main-container relative'>
                <div className="absolute top-[-16px] left-0 flex-start-10" >
                    <div className='img-80 bg-medium border-2 rounded-full border-white' />
                </div>
                <div className='flex gap-2 pt-2 animate-pulse'>
                    <div className='ml-[100px] space-y-2 w-[75%]'>
                        <div className='h-[30px] bg-medium rounded' />
                        <div className='h-[17px] w-[25%] bg-medium rounded' />
                    </div>
                    <div className='w-[100px] bg-medium h-[30px] rounded-full' />
                </div>
            </div>
        </div>
    </div>
    )
}


export { CommunityBoxSkeleton, AboutCommunitySkeleton, CommunityBannerSkeleton }