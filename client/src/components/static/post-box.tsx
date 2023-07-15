import React, { ReactNode, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Reference } from '@apollo/client'
import toast from 'react-hot-toast'
import { PostInfo, VoteStatusValues } from '@/types'
import { getTimeAgo } from '@/utils'
import { defaultCommunityIcon } from '@/lib/constants'
import { PaginatedPosts, VoteType, useDeletePostMutation, useJoinCommunityMutation, useMeQuery, useVoteMutation } from "@/generated/graphql"
import { useGlobalState, useModal } from '@/hooks'
import { setShowSignInModal } from '@/action'
import { ArrowUpDown, CommentIcon, ShareIcon, SaveIcon, EditIcon, DeleteIcon } from '../icons'
import EditPost from './edit-post'
import Modal from './modal'

type PostBoxProps = {
    post: PostInfo,
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
    // Object destructure from post
    const { id, points, user: { username }, textSnippet, voteStatus, title, text, createdAt, community: { name: communityName, hasJoined, communityIconUrl }, numComments, imageUrl, urlLink } = post
    const pointsClassname = getPointsColorClassname(voteStatus)
    const timeAgo = getTimeAgo(Number(createdAt))
    // React hooks
    const router = useRouter()
    const { options } = router.query
    const [showEdit, setShowEdit] = useState(false)
    const [isLoading, setLoading] = useState(true);
    const { dispatch } = useGlobalState()
    const { isOpen, openModal, closeModal } = useModal()

    // GraphQL hooks
    const [vote] = useVoteMutation()
    const { data: meData } = useMeQuery()
    const [delelePost, { loading: isDeleteLoading }] = useDeletePostMutation()
    const [joinCommunity, { data: joinData }] = useJoinCommunityMutation()

    // Utils
    const handlePostClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        if (!comments) router.push(`/static/r/${communityName}/comments/${id}`)
    }

    const handleDeletePost = async (postId: number) => {
        await delelePost({
            variables: { deletePostId: postId }, update(cache, { data: deleteData }) {
                if (deleteData?.deletePost) {
                    toast.success('Successfully delete post!')
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
                    closeModal()
                    if (router.pathname === '/static/r/[community]/comments/[id]') { router.push('/static') }
                }
            }
        })
    }

    const handleJoinCommunity = async () => {
        if (!meData?.me) {
            dispatch(setShowSignInModal(true))
            return
        }
        try {
            const response = await joinCommunity({ variables: { communityName } })
            if (response.data?.joinCommunity.community?.hasJoined) {
                toast.success(`Successfully joined r/${communityName}!`)
            }
        }
        catch (err) {
            toast.error(`Error when joining r/${communityName} `)
        }
    }

    const upVote = async (voteValue: number, postId: number) => {
        if (!meData?.me) {
            dispatch(setShowSignInModal(true))
            return
        }
        if (voteValue !== VoteStatusValues.Upvote) {
            await vote({
                variables: {
                    postId,
                    voteValue: VoteType.Upvote
                }
            })
        }
    }

    const downVote = async (voteValue: number, postId: number) => {
        if (!meData?.me) {
            dispatch(setShowSignInModal(true))
            return
        }
        if (voteValue !== VoteStatusValues.Downvote) {
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

    return (<>
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
                            href={`/static/r/${communityName}`}
                            onClick={(e) => e.stopPropagation()}
                            className='flex-start gap-[5px]'>
                            <Image
                                width='0'
                                height='0'
                                alt='avatar'
                                sizes='50%'
                                src={communityIconUrl || defaultCommunityIcon}
                                className='img-14'
                            />
                            <span className='font-bold hover:underline'>r/{communityName}</span>
                            <span className='text-gray'>•</span>
                        </Link>}
                        <div>
                            <span className='text-gray'>&nbsp;Posted by <Link
                                href={`/static/user/${username}`}
                                onClick={(e) => e.stopPropagation()} className='hover:underline'>
                                u/{username}</Link>
                                <span className='text-gray'> - </span>
                                {timeAgo}</span>
                        </div>
                    </div>
                    {!hasJoined && !hideJoinBtn && <button
                        type="button" className='text-sm button-main disabled:cursor-none disabled:bg-medium'
                        onClick={(e) => {
                            e.stopPropagation()
                            handleJoinCommunity()
                        }}
                        disabled={joinData?.joinCommunity.community?.hasJoined}
                    >{joinData?.joinCommunity.community?.hasJoined ? 'Joined' : 'Join'}</button>}
                </div>
                {isTrendingPost ?
                    <div>
                        <h2 className='pr-3 label-md'>{title}</h2>
                        {urlLink && <Link className='text-xs text-cate-blue' href={urlLink}>{urlLink.slice(0, 30)}...</Link>}
                    </div>
                    : <div>
                        <h2 className='pr-3'>{title}</h2>
                        {urlLink && <Link className='text-sm text-cate-blue' href={urlLink}>{urlLink.slice(0, 30)}...</Link>}
                    </div>
                }
                {!isTrendingPost && <>
                    {!isEditing && <p>{isSinglePost ? text : textSnippet}</p>}
                    {imageUrl &&
                        <div className="relative h-auto w-full bg-gray-200 object-contain">
                            <Image
                                alt="post-image"
                                src={imageUrl}
                                priority
                                width="500"
                                height="500"
                                sizes='100%'
                                className={`w-auto h-auto mx-auto duration-700  ease-in-out group-hover:opacity-75 max-h-[500px]
                                ${isLoading ? "blur-2xl grayscale" : "blur-0 grayscale-0"}
                                `}
                                onLoadingComplete={() => setLoading(false)}
                            />
                        </div>
                    }
                    <div className='text-xs flex-start-10'>
                        <div className={`${comments ? 'post-action-disable' : 'post-action'}`}>
                            <CommentIcon />
                            {numComments} Comments
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
                                            pathname: `/static/r/${communityName}/comments/${id}`,
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
                                onClick={(e) => {
                                    e.stopPropagation()
                                    openModal()
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
                            {numComments} comments
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
        <Modal isOpen={isOpen}
            closeModal={closeModal}
        >
            <div className="flex-col-center-10 p-2">
                <div>Are you sure you want to delete this post?</div>
                <div className="flex-center gap-2 w-full mt-2">
                    <button type='button' className='button-main-outline' onClick={closeModal}>Cancel</button>
                    <button type='button' className='button-main'
                        disabled={isDeleteLoading}
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDeletePost(post.id)
                        }}>{isDeleteLoading ? 'Loading' : 'Delete'}</button>
                </div>
            </div>

        </Modal>
    </>
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