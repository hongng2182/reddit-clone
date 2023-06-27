import React, { ReactNode } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ArrowUpDown, CommentIcon, ShareIcon, SaveIcon } from '../icons'

type Post = {
    id: number,
    points: number,
    title: string,
    username: string,
    textSnippet: string,
    community: string,
    createdAt: string
    // link, imgsrc
}

type PostBoxProps = {
    post: Post,
    hideCommunity?: boolean,
    hideJoinBtn?: boolean,
    comments?: ReactNode,
    isTrendingPost?: boolean,
}
function PostBox({ post, hideCommunity, hideJoinBtn, comments, isTrendingPost }: PostBoxProps) {
    const router = useRouter()
    const handlePostClick = () => {
        if (!comments) router.push(`/static/r/${post.community}/comments/${post.id}`)
    }
    return (
        <div onClick={handlePostClick}
            className={`${comments ? 'border-transparent' : 'hover:border-gray cursor-pointer'}
            ${isTrendingPost && 'p-2'} white-gray-rounded flex w-full`}>
            {/* LEFT UPDOOT */}
            {!isTrendingPost && <div className={`${comments ? 'bg-white' : 'bg-light'}w-[40px]  text-xs font-bold p-1 flex-col-start gap-[8px]`} id='upvote' >
                <ArrowUpDown type='up' className='mx-auto hover:bg-medium hover:fill-secondary' />
                <span className='mx-auto'>{post.points}</span>
                <ArrowUpDown type='down' className='mx-auto hover:bg-medium hover:fill-primary' />
            </div >}
            {/* RIGHT */}
            <div className='p-2 flex-col-start-10 max-w-[calc(100%-40px)]' >
                <div className='flex-between w-full'>
                    <div className='text-xs md:flex-start flex-col-start'>
                        {!hideCommunity && <Link
                            href={`/static/r/${post.community}`}
                            onClick={(e) => e.stopPropagation()}
                            className='flex-start gap-[5px]'>
                            <Image
                                width='0'
                                height='0'
                                alt='avatar'
                                src='/logo-cat.png'
                                className='w-[14px] h-[14px] rounded-full'
                            />
                            <span className='font-bold hover:underline'>r/{post.community}</span>
                            <span className='text-gray'>•</span>
                        </Link>}
                        <div>
                            <span className='text-gray'>&nbsp;Posted by <span className='hover:underline'>
                                u/{post.username}</span> {post.createdAt} ago</span>
                        </div>
                    </div>
                    {!hideJoinBtn && <button type="button" className='text-sm button-light hover:bg-medium'>Join</button>}
                </div>
                {isTrendingPost ?
                    <h2 className='pr-3 label-md'>{post.title}</h2>
                    : <h2 className='pr-3'>{post.title}</h2>}
                {!isTrendingPost && <>
                    <p>{post.textSnippet}</p>
                    <div className='text-xs flex-start-10'>
                        <div className={`${comments ? 'post-action-disable' : 'post-action'}`}>
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
                </>}
                {isTrendingPost &&
                    <div className="flex-start-10">
                        <p className='text-gray text-xs'>
                            {post.points} upvotes
                        </p>
                        <p className='text-gray text-xs'>
                            35 comments
                        </p>
                    </div>
                }
                {/* COMMENTS */}
                {comments &&
                    <div className='w-full'>
                        <span className='label-md'>Comment as hongng2182</span>
                        <div className='rounded-sm border border-medium mt-2'>
                            <textarea name="create-post" className=' w-full font-light px-2 py-3 h-[70px] focus:outline-none' placeholder='Create Post'
                            />
                            <div className='flex-end p-2 bg-light'>
                                <button type="button" className='button-main'>Comment</button>
                            </div>
                        </div>
                    </div>}
                {comments && comments}
            </div>
        </div >
    )
}

PostBox.defaultProps = {
    hideCommunity: false,
    hideJoinBtn: false,
    comments: null,
    isTrendingPost: false
}

export default PostBox