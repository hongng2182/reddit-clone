import React, { ReactNode, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Reference } from '@apollo/client'
import { VoteStatusValues } from '@/types'
import { PaginatedPosts, VoteType, useDeletePostMutation, useMeQuery, useVoteMutation } from "@/generated/graphql"
import { ArrowUpDown, CommentIcon, ShareIcon, SaveIcon, EditIcon, DeleteIcon } from '../icons'
import EditPost from './edit-post'

type PostBoxProps = {
    post: { __typename?: 'Post', id: number, title: string, text: string, points: number, ownerId: number, createdAt: string, updatedAt: string, textSnippet: string, voteStatus: number, user: { __typename?: 'User', username: string } },
    hideCommunity?: boolean,
    hideJoinBtn?: boolean,
    comments?: ReactNode,
    isTrendingPost?: boolean,
    isSinglePost?: boolean,
    isEditing?: boolean
}

const getPointsColorClassname = (voteStatus: number) => {
    switch (voteStatus) {
        case VoteStatusValues.Upvote:
            return 'text-secondary'
        case VoteStatusValues.Downvote:
            return 'text-primary'
        default:
            return 'text-black'
    }
}
function PostBox({ post, hideCommunity, hideJoinBtn, comments, isTrendingPost, isSinglePost, isEditing }: PostBoxProps) {
    const router = useRouter()
    const { options } = router.query
    const [vote] = useVoteMutation()
    const { data: meData } = useMeQuery()
    const [delelePost, { loading: isDeleteLoading }] = useDeletePostMutation()
    const [showEdit, setShowEdit] = useState(false)
    // TODO: add field numOfComments, community to Post
    const community = 'mini-reddit'
    const { id, points, user: { username }, textSnippet, voteStatus, title, text, createdAt } = post
    const pointsClassname = getPointsColorClassname(voteStatus)

    const handlePostClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        if (!comments) router.push(`/static/r/${community}/comments/${id}`)
    }

    const handleDeletePost = async (postId: number) => {
        await delelePost({
            variables: { deletePostId: postId }, update(cache, { data: deleteData }) {
                if (deleteData?.deletePost) {
                    cache.modify({
                        fields: {
                            posts(existing: Pick<PaginatedPosts,
                                '__typename' | 'pageInfo'> & { paginatedPosts: Reference[] }) {

                                const newEndCursor = existing.pageInfo.endCursor ? parseInt
                                    (Buffer.from(existing.pageInfo.endCursor, 'base64').toString(), 10) - 1 : null

                                const newpageInfo = newEndCursor ?
                                    {
                                        ...existing.pageInfo,
                                        endCursor: Buffer.from((newEndCursor).toString()).toString('base64')
                                    } :
                                    { ...existing.pageInfo }

                                const newPostsAfterDelete = {
                                    ...existing,
                                    pageInfo: newpageInfo,
                                    // eslint-disable-next-line no-underscore-dangle
                                    paginatedPosts: existing.paginatedPosts.filter(postRef => postRef.__ref !== `Post:${postId}`)
                                }
                                return newPostsAfterDelete
                            }
                        }
                    })
                }
            }
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const upVote = async (voteStatus: number, postId: number) => {
        if (voteStatus !== VoteStatusValues.Upvote) {
            await vote({
                variables: {
                    postId,
                    voteValue: VoteType.Upvote
                }
            })
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const downVote = async (voteStatus: number, postId: number) => {
        if (voteStatus !== VoteStatusValues.Downvote) {
            await vote({
                variables: {
                    postId,
                    voteValue: VoteType.Downvote
                }
            })
        }
    }
    useEffect(() => {
        if (isEditing) setShowEdit(true)
    }, [isEditing])
    return (
        <div onClick={(e) => handlePostClick(e)}
            className={`${comments ? 'border-transparent' : 'hover:border-gray cursor-pointer'}
            ${isTrendingPost && 'p-2'} white-gray-rounded flex shadow-md w-full`}>
            {/* LEFT UPDOOT */}
            {!isTrendingPost && <div className={`${comments ? 'bg-white' : 'bg-light'}w-[40px] text-xs font-bold p-1 flex flex-col items-center`} id='upvote' >
                <ArrowUpDown
                    type='up'
                    variant={voteStatus === VoteStatusValues.Upvote ? 'fill' : 'outline'}
                    fill={voteStatus === VoteStatusValues.Upvote ? '#FF6363' : '#7C7C7C'}
                    className='mx-auto hover:bg-medium hover:fill-secondary'
                    onClick={(e) => {
                        e.stopPropagation()
                        upVote(voteStatus, id)
                    }} />
                <span className={pointsClassname}>{points}</span>
                <ArrowUpDown
                    type='down'
                    variant={voteStatus === VoteStatusValues.Downvote ? 'fill' : 'outline'}
                    fill={voteStatus === VoteStatusValues.Downvote ? '#39B5E0' : '#7C7C7C'}
                    className='mx-auto hover:bg-medium hover:fill-primary'
                    onClick={(e) => {
                        e.stopPropagation()
                        downVote(post.voteStatus, post.id)
                    }}
                />
            </div >}
            {/* RIGHT */}
            <div className='w-full p-2 flex-col-start-10 max-w-[calc(100%-40px)]' >
                <div className='flex-between w-full'>
                    <div className='text-xs md:flex-start flex-col-start'>
                        {!hideCommunity && <Link
                            href={`/static/r/${community}`}
                            onClick={(e) => e.stopPropagation()}
                            className='flex-start gap-[5px]'>
                            <Image
                                width='0'
                                height='0'
                                alt='avatar'
                                src='/logo-cat.png'
                                className='w-[14px] h-[14px] rounded-full'
                            />
                            <span className='font-bold hover:underline'>r/{community}</span>
                            <span className='text-gray'>•</span>
                        </Link>}
                        <div>
                            <span className='text-gray'>&nbsp;Posted by <Link
                                href={`/static/user/${username}`}
                                onClick={(e) => e.stopPropagation()} className='hover:underline'>
                                u/{username}</Link> {createdAt} ago</span>
                        </div>
                    </div>
                    {!hideJoinBtn && <button type="button" className='text-sm button-light hover:bg-medium'>Join</button>}
                </div>
                {isTrendingPost ?
                    <h2 className='pr-3 label-md'>{title}</h2>
                    : <h2 className='pr-3'>{title}</h2>}
                {!isTrendingPost && <>
                    {!isEditing && <p>{isSinglePost ? text : textSnippet}</p>}
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

                        {meData?.me?.id === post.ownerId && <>
                            <button className='post-action'
                                type='button'
                                disabled={isDeleteLoading}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    if (!options) {
                                        router.push({
                                            pathname: `/static/r/${community}/comments/${id}`,
                                            query: { options: 'edit' }
                                        })
                                    } else {
                                        setShowEdit(true)
                                    }
                                }}>
                                <EditIcon />
                                Edit
                            </button>
                            <button className='post-action'
                                type='button'
                                disabled={isDeleteLoading}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeletePost(post.id)
                                }}>
                                <DeleteIcon />
                                Delete
                            </button>
                        </>}
                    </div>
                </>}
                {isTrendingPost &&
                    <div className="flex-start-10">
                        <p className='text-gray text-xs'>
                            {points} upvotes
                        </p>
                        <p className='text-gray text-xs'>
                            35 comments
                        </p>
                    </div>
                }
                {/* EDIT POSTS */}

                {showEdit && <EditPost hideEdit={() => setShowEdit(false)} />}

                {/* COMMENTS */}
                {comments &&
                    <div className='w-full'>
                        <span className='label-md'>Comment as {meData?.me?.username}</span>
                        <div className='rounded-sm border border-medium mt-2'>
                            <textarea name="create-post" className=' w-full font-light px-2 py-3 h-[70px] focus:outline-none' placeholder='What are your thoughts?'
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
    isTrendingPost: false,
    isSinglePost: false,
    isEditing: false
}

export default PostBox