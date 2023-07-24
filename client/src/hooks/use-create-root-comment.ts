import toast from "react-hot-toast"
import { PostDocument, useCreateCommentMutation } from "@/generated/graphql"

const useCreateRootCommentHook = ({ postId, parentId, onReplyCommentSuccess }: { postId: number, parentId?: number, onReplyCommentSuccess?: () => void }) => {

    const [createComment, {loading: createCommentLoading}] = useCreateCommentMutation({
        update(cache, { data }) {
            const newCommentData = data?.createComment.comment
            if (newCommentData) {
                cache.updateQuery({
                    query: PostDocument,
                    variables: { postId }
                }, (cacheData) =>
                // console.log('cacheUpdate', {
                //     ...cacheData.post,
                //     comments: [newCommentData, ...cacheData.post.comments],
                //     numComments: cacheData.post.numComments + 1
                // })
                ({
                    post: {
                        ...cacheData.post,
                        comments: [newCommentData, ...cacheData.post.comments],
                        numComments: cacheData.post.numComments + 1
                    }
                })
                )
            }
        }
    })

    const onCommentSubmit = async (message: string) => {
        await createComment({
            variables: {
                input: {
                    message,
                    postId,
                    parentId: null
                }
            }
        })
    }

    const onCommentReplySubmit = async (replyMessage: string) => {
        const response = await createComment({
            variables: {
                input: {
                    message: replyMessage,
                    postId,
                    parentId: parentId && parentId
                }
            }
        })
        if (response.data?.createComment.comment) {
            if (onReplyCommentSuccess) {
                onReplyCommentSuccess()
            }
        }
        if (response.data?.createComment.errors) {
            toast.error(response.data?.createComment.errors)
        }
    }

    return { onCommentSubmit, onCommentReplySubmit, createCommentLoading }
}

export default useCreateRootCommentHook
