import { gql } from '@apollo/client'
import { useDeleteCommentMutation, useUpdateCommentMutation } from '@/generated/graphql';

function useUpdateDeleteComment({ commentId }: { commentId: number }) {
    const [updateComment, { loading: updateCommentLoading }] = useUpdateCommentMutation()
    const [deleteComment, { loading: isDeleteLoading }] = useDeleteCommentMutation({
        update(cache, { data }) {
            const deleteResult = data?.deleteComment
            if (deleteResult) {
                try {
                    const commentCacheKey = `Comment:${commentId}`;
                    cache.writeFragment({
                        id: commentCacheKey,
                        fragment: gql`
          fragment UpdatedComment on Comment {
            isDeleted
            updatedAt
          }
        `,
                        data: {
                            isDeleted: true,
                            updatedAt: Date.now()
                        },
                    });

                } catch (err) { console.log(err) }
            }
        }
    })

    return { updateComment, deleteComment, updateCommentLoading, isDeleteLoading }
}

export default useUpdateDeleteComment