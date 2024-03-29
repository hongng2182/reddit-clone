/* eslint-disable react/require-default-props */
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useMeQuery } from '@/generated/graphql';
import { CommentInfo } from '@/types'
import { useCreateRootCommentHook, useGlobalState, useModal, useUpdateDeleteComment } from '@/hooks'
import { setShowSignInModal } from '@/action'
import { defaultDeleteIcon, defaultProfileIcon } from '@/lib/constants'
import CommentForm from './comment-form'
import Modal from './modal'
import { CommentIcon, DeleteIcon, EditIcon, ExpandIcon, LoadingIcon } from './icons'

// Utils
function getReplies(parentId: string | number, commentsByParentId: {
    [key: string]: CommentInfo[];
    [key: number]: CommentInfo[];
}) {
    return commentsByParentId[parentId]
}

const DynamicTimeAgo = dynamic(() => import('./time-ago'), { ssr: false })

// Types
type Props = {
    comment: CommentInfo, commentsByParentId: {
        [key: string]: CommentInfo[];
        [key: number]: CommentInfo[];
    }
}

// Main Component
function CommentDetail({ comment, commentsByParentId }: Props) {
    // Props destructuring
    const { id, postId, createdAt, updatedAt, message, isDeleted, user: { username, profileUrl, id: ownerId } } = comment

    // React hooks
    const router = useRouter()
    const { context } = router.query
    const [showReplyComment, setShowReplyComment] = useState(false)
    const [isEditingComment, setIsEditingComment] = useState(false)
    const [showComment, setShowComment] = useState(true)
    const { dispatch } = useGlobalState()

    // GraphQL hooks
    const { data: meData } = useMeQuery()

    // Custom hooks
    const { isOpen, openModal, closeModal } = useModal()
    const childComments = getReplies(comment.id, commentsByParentId)

    // update + delete comment
    const { updateComment, deleteComment, updateCommentLoading, isDeleteLoading } = useUpdateDeleteComment({ commentId: id })

    const onReplyCommentSuccess = () => {
        setShowReplyComment(false)
    }
    
    // create comment
    const { onCommentReplySubmit, createCommentLoading } = useCreateRootCommentHook({ postId, parentId: id, onReplyCommentSuccess })

    const onCommentUpdateSubmit = async (updateMessage: string) => {
        const response = await updateComment({ variables: { updateCommentId: id, message: updateMessage } })
        if (response.data?.updateComment?.comment) {
            setIsEditingComment(false)
        }
        if (response.data?.updateComment?.errors) {
            toast.error(response.data?.updateComment.errors)
        }
    }

    const onDeleteComment = async () => {
        const response = await deleteComment({ variables: { deleteCommentId: id } })
        if (response.data?.deleteComment) {
            toast.success("Successfully delete comment!")
            closeModal()
        }
        if (!response.data?.deleteComment) {
            toast.error("Error delete comment!")
            closeModal()
        }
    }

    return (<>
        <div className='w-full max-w-full relative mb-2 box-border'>
            {!showComment && <div className='h-[30px] flex-start-10'>
                <ExpandIcon className='cursor-pointer absolute ml-[-12px]' onClick={() => setShowComment(true)} />
                <Image
                    width='0'
                    height='0'
                    alt='avatar'
                    sizes='100%'
                    src={isDeleted ? defaultDeleteIcon : (profileUrl || defaultProfileIcon)}
                    className='img-24 ml-[20px]'
                />
                {isDeleted ? <div>
                    <span className='text-gray text-sm mr-1'>
                        Comment delete by user -</span>
                    <span className='text-gray text-xs'>
                        <DynamicTimeAgo time={updatedAt} />
                    </span>
                </div> : <div>
                    <span className='username'>{username}</span>
                    <span className='text-gray text-xs'><DynamicTimeAgo time={createdAt} /></span>
                </div>}

            </div>}
            {showComment && <><div className='absolute h-full w-[2px] bg-medium hover:bg-primary cursor-pointer' onClick={() => setShowComment(false)} />
                <div className='flex-start-col-10 w-full'
                    style={{ backgroundColor: `${Number(context) === id ? 'rgba(0, 121, 211, 0.05)' : 'white'}` }} >
                    <Image
                        width='0'
                        height='0'
                        alt='avatar'
                        sizes='100%'
                        src={isDeleted ? defaultDeleteIcon : (profileUrl || defaultProfileIcon)}
                        className='img-24 absolute left-[-12px]'
                    />

                    {!isDeleted && <div className='flex-col-start-10 pl-[20px]'>
                        <div>
                            <Link href={`/user/${username}`} className='hover:underline username'>{username}</Link>
                            <span className='text-gray text-xs'><DynamicTimeAgo time={createdAt} /></span>
                        </div>
                        {isEditingComment ? <CommentForm
                            isLoading={updateCommentLoading}
                            initialValue={message}
                            onSubmit={onCommentUpdateSubmit}
                            onCancel={() => setIsEditingComment(false)}
                            isEdit /> : <p >{message}</p>}

                        {!isEditingComment && <div className='text-xs flex-start-10 mb-3'>
                            <button type='button' className='post-action'
                                onClick={() => {
                                    if (meData?.me) {
                                        setShowReplyComment(!showReplyComment)
                                    }
                                    else {
                                        dispatch(setShowSignInModal(true))
                                    }
                                }}>
                                <CommentIcon />
                                Reply
                            </button>
                            {meData?.me?.id === ownerId && <>
                                <button type='button' className='post-action'
                                    onClick={() => { setIsEditingComment(!isEditingComment) }}>
                                    <EditIcon />
                                    Edit
                                </button>
                                <button type='button' className='post-action'
                                    onClick={openModal}>
                                    <DeleteIcon />
                                    Delete
                                </button>
                            </>
                            }
                        </div>}
                        {showReplyComment &&
                            <CommentForm
                                isLoading={createCommentLoading}
                                initialValue=''
                                onSubmit={onCommentReplySubmit}
                                onCancel={() => setShowReplyComment(false)}
                                isReply />
                        }
                    </div>}
                    {isDeleted && <div className='pl-[20px] mb-2'>
                        <span className='text-gray text-sm mr-1'>
                            Comment delete by user -</span>
                        <span className='text-gray text-xs'><DynamicTimeAgo time={updatedAt} /></span>
                    </div>}
                </div>
                {childComments && childComments.length > 0 && childComments.map(childComment => (
                    <div key={childComment.id} className="pl-[20px] max-w-full">
                        <CommentDetail comment={childComment} commentsByParentId={commentsByParentId} />
                    </div>))}
            </>}
        </div>
        <Modal isOpen={isOpen}
            closeModal={closeModal}
        >
            <div className="flex-col-center-10 p-2">
                <div>Are you sure you want to delete this comment?</div>
                <div className="flex-center gap-2 w-full mt-2">
                    <button type='button' className='button-main-outline' onClick={closeModal}>Cancel</button>
                    <button type='button' className='button-main'
                        disabled={isDeleteLoading}
                        onClick={onDeleteComment}>{isDeleteLoading ? <LoadingIcon /> : 'Delete'}</button>
                </div>
            </div>
        </Modal>
    </>
    )
}

export default CommentDetail