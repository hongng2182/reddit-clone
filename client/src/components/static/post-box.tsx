import React from 'react'
import Image from 'next/image'
import { ArrowUpDown, CommentIcon, ShareIcon, SaveIcon } from '../icons'

type Post = {
    id: number, points: number, title: string, username: string, textSnippet: string,
    community: string,
    createdAt: string
}
function PostBox({ post }: { post: Post }) {
    return (
        <div className='white-gray-rounded flex cursor-pointer w-full'>
            {/* LEFT UPDOOT */}
            <div className='w-[40px] bg-light text-xs font-bold p-1 flex-col-start gap-[8px]' id='upvote'>
                <ArrowUpDown type='up' className='mx-auto hover:bg-medium hover:fill-secondary' />
                <span className='mx-auto'>{post.points}</span>
                <ArrowUpDown type='down' className='mx-auto hover:bg-medium hover:fill-primary' />
            </div>
            {/* RIGHT */}
            <div className='p-2 flex-col-start-10 max-w-[calc(100%-40px)]'>
                <div className='flex-between w-full'>
                    <div className='text-xs md:flex-start flex-col-start'>
                        <div className='flex-start gap-[5px]'>
                            <Image
                                width='0'
                                height='0'
                                alt='avatar'
                                src='/logo-cat.png'
                                className='w-[14px] h-[14px] rounded-full'
                            />
                            <span className='font-bold hover:underline'>r/{post.community}</span>
                        </div>
                        <div className=''>
                            <span className='text-gray'>&nbsp;•&nbsp;Posted by <span className='hover:underline'>
                                u/{post.username}</span> {post.createdAt} ago</span>
                        </div>
                    </div>
                    <button type="button" className='text-sm button-light hover:bg-medium'>Join</button>
                </div>
                <h2 className='pr-3'>{post.title}</h2>
                <p>{post.textSnippet}</p>
                <div className='text-xs flex-start-10'>
                    <div className='post-action'>
                        <CommentIcon />
                        25 Comments
                    </div>
                    <div className='post-action'>
                        <ShareIcon />
                        Share
                    </div>
                    <div className='post-action'>
                        <SaveIcon />
                        Save
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostBox