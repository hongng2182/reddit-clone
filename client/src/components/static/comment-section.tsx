/* eslint-disable react/require-default-props */
import React from 'react'
import Image from 'next/image'
import { ArrowUpDown, CommentIcon, ShareIcon } from '../icons'

function SingleComment({ innerComment }: { innerComment?: boolean }) {
    return <> <div className='flex-start-10'>
        <div className='w-[36px] h-[36px]'>
            <Image
                width='0'
                height='0'
                alt='avatar'
                src='/logo-cat.png'
                className='w-[36px] h-[36px] rounded-full'
            />
        </div>
        <div className='flex-start-10'>
            <span className='username'>hongng2182</span>
            <span className='text-gray text-sm'>19 hr. ago</span>
        </div>
    </div>
        <div className='flex-col-start-10 mt-1 border-l-2 border-medium ml-[18px] pl-[26px]'>
            <p>Comment details</p>
            <div className='text-xs flex-start-10'>
                <div className='flex-start gap-[5px] rounded-sm p-2 font-bold cursor-pointer'>
                    <ArrowUpDown type='up' className='mx-auto hover:bg-medium hover:fill-secondary' />
                    <span className='mx-auto'>1250</span>
                    <ArrowUpDown type='down' className='mx-auto hover:bg-medium hover:fill-primary' />
                </div>
                <div className='post-action'>
                    <CommentIcon />
                    Reply
                </div>
                <div className='post-action'>
                    <ShareIcon />
                    Share
                </div>
            </div>
            {innerComment && <SingleComment />}
        </div>
    </>
}


function CommentSection() {
    return (
        <div>
            <SingleComment innerComment />
        </div>
    )
}

export default CommentSection