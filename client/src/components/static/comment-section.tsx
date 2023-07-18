/* eslint-disable react/require-default-props */
import React, { useMemo } from 'react'
import { CommentInfo } from '@/types';
import CommentDetail from './comment-detail';

function CommentSection({ commentsData }: { commentsData: CommentInfo[] }) {
    const commentsByParentId = useMemo(() => {
        const group: { [key: string | number]: CommentInfo[] } = { 'rootComments': [] }
        commentsData.forEach(comment => {
            if (comment.parentId !== null && comment.parentId !== undefined) {
                group[comment.parentId] ||= [];
                group[comment.parentId].push(comment);
            } else {
                group.rootComments.push(comment)
            }
        })
        return group
    }, [commentsData])


    const { rootComments } = commentsByParentId

    return (
        <div className='w-full'>
            {rootComments.length > 0 && rootComments.map(comment => (
                <CommentDetail key={comment.id} comment={comment} commentsByParentId={commentsByParentId} />
            ))}
        </div>
    )
}

export default CommentSection