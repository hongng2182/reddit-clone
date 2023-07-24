import { Reference } from "@apollo/client"
import toast from "react-hot-toast"
import { PaginatedPosts, useDeletePostMutation } from "@/generated/graphql"


function useDeletePost({ onDeletePostSuccess }: { onDeletePostSuccess: () => void }) {
    const [delelePost, { loading: isDeleteLoading }] = useDeletePostMutation()

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
                    if (onDeletePostSuccess) {
                        onDeletePostSuccess()
                    }
                }
            }
        })
    }
    return { isDeleteLoading, handleDeletePost }
}
export default useDeletePost