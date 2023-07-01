/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react'
import Image from 'next/image'
import { comments_mockup } from '@/mockup';
import { ArrowUpDown, CommentIcon } from '../icons'

interface Comment {
    author: string;
    authorId: string;
    created: number;
    depth: number;
    id: string,
    "next": null | {
        "id": string,
        "type": "comment"
    },
    "parentId": null | string,
    "permalink": string,
    "prev": null | {
        "id": string,
        "type": "comment"
    },
    "postAuthor": null,
    "postId": string,
    "postTitle": null,
    "score": number,
    "sendReplies": boolean,
    "subredditId": string,
    "voteState": number,
    "media": {
        "richtextContent": string
    },
    "profileImage": string
}

function SingleComment({ comment }: { comment: Comment }) {
    const { author, media, depth, score } = comment;
    const [showComment, setShowComment] = useState(false)
    return <div style={{ marginTop: depth === 0 ? '20px' : '0px' }}>
        <div className='relative box-border' style={{ paddingLeft: `${depth * 20}px` }} >
            <div className='absolute left-0 top-0 z-[2] h-full'>
                <div style={{ width: `${depth * 20}px` }} className="inline-block h-full box-border">
                    {Array.from(Array(depth).keys()).map(_ => <div
                        style={{ width: depth > 0 ? `calc(100% / ${depth})` : '100%' }} className='h-full inline-block'>
                        <div className='h-full w-[2px] bg-medium' />
                    </div>)}
                </div>
            </div>
            <div className='w-full relative border-l-2 border-medium'>
                <div className='flex-start-col-10 w-full' >
                    <div className='z-[3] w-[35px] h-[35px] bg-medium rounded-full absolute left-[-17.5px]'>
                        <Image
                            width='0'
                            height='0'
                            alt='avatar'
                            sizes='100%'
                            src={comment.profileImage}
                            className='img-35'
                        />
                    </div>

                    <div className='flex-col-start-10 pl-[20px]'>
                        <div className='flex-start-10 mt-2'>
                            <span className='username'>{author}</span>
                            <span className='text-gray text-sm'>19 hr. ago</span>
                        </div>
                        <p >{media && media.richtextContent}</p>
                        <div className='text-xs flex-start-10 mb-3'>
                            <div className='flex-start gap-[5px] rounded-sm p-2 font-bold cursor-pointer'>
                                <ArrowUpDown type='up' className='mx-auto hover:bg-medium hover:fill-secondary' />
                                <span className='mx-auto'>{score}</span>
                                <ArrowUpDown type='down' className='mx-auto hover:bg-medium hover:fill-primary' />
                            </div>
                            <button type='button' className='post-action'
                                onClick={() => { setShowComment(!showComment) }}>
                                <CommentIcon />
                                Reply
                            </button>
                        </div>
                        {/* COMMENTS */}
                        {showComment && <div className='w-full border-l-2 border-medium mb-2 px-4'>
                            <div className='rounded-sm border border-medium'>
                                <textarea name="create-post" className=' w-full font-light px-2 py-3 h-[70px] focus:outline-none' placeholder='Create Post'
                                />
                                <div className='flex-end p-2 bg-light gap-[10px]'>
                                    <button type="button" onClick={() => setShowComment(false)} className='button-main-outline'>Cancel</button>
                                    <button type="button" className='button-main'>Comment</button>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    </div>
}


function CommentSection() {

    const commentIds = Object.keys(comments_mockup)

    return (
        <div>
            {commentIds.map((commentId) => (
                <SingleComment key={commentId} comment={comments_mockup[commentId]} />
            ))}
        </div>
    )
}

export default CommentSection