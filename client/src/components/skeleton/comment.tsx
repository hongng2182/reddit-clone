import React from 'react'
import { CommentIcon } from '../icons'

function CommentSkeleton() {
    return (
        <div className='w-full bg-white flex gap-2 animate-pulse p-2 white-gray-rounded'>
            <CommentIcon />
            <div className='pt-[2px] flex flex-col space-y-2 w-full h-full'>
                <div className='h-[20px] w-2/3 bg-medium rounded' />
                <div className='h-[75px] bg-medium rounded' />
            </div>
        </div>
    )
}

export default CommentSkeleton