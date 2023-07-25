import React from 'react'
import { ArrowUpDown } from '../icons'

type PostBoxProps = {
    isSearchPost?: boolean,
}

function PostBoxSkeleton({ isSearchPost }: PostBoxProps) {

    return (isSearchPost ?
        <div className="white-gray-rounded p-3 shadow-md w-full">
            <div className='animate-pulse space-y-2'>
                <div className="flex space-x-2 h-[22px]">
                    <div className='w-1/5 bg-medium rounded' />
                    <div className='w-1/3 bg-medium rounded ' />
                </div>
                <div className="flex space-x-2 h-[98px] ">
                    <div className='w-full bg-medium rounded' />
                    <div className='w-[138px] rounded bg-medium' />
                </div>
                <div className='w-1/3 h-[18px] bg-medium rounded' />
            </div>
        </div> :
        <div className='white-gray-rounded flex shadow-md w-full'>
            {/* LEFT UPDOOT */}
            <div className="w-[40px] p-1 flex flex-col space-y-3 items-center">
                <ArrowUpDown
                    type='up'
                    variant='outline'
                    fill='#7C7C7C'
                    className='mx-auto' />
                <ArrowUpDown
                    type='down'
                    variant='outline'
                    fill='#7C7C7C'
                    className='mx-auto'
                />
            </div >
            {/* RIGHT */}
            <div className='w-full p-2 flex-col-start-10 animate-pulse'>
                <div className='h-[20px] w-1/2 bg-medium rounded-md' />
                <div className='h-[25px] w-3/4 bg-medium rounded' />
                <div className='h-[300px] w-full bg-medium rounded' />
                <div className='h-[30px] w-1/3 bg-medium rounded' />
            </div>
        </div >
    )
}

PostBoxSkeleton.defaultProps = {
    isSearchPost: false,
}

export default PostBoxSkeleton