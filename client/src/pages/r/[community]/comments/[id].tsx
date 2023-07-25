/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { PostDocument, usePostQuery } from '@/generated/graphql'
import { addApolloState, initializeApollo } from '@/lib/apolloClient'
import { PageContainer, PostBox, CommentSection, Error } from '@/components'
import { useSetActiveFeed } from '@/hooks'

function SinglePostPage({ isError: isErrorFromServer }: { isError: boolean }) {
    if (isErrorFromServer) {
        return <Error />
    }

    const router = useRouter()
    const { options, id: postId } = router.query
    const { data } = usePostQuery({ variables: { postId: Number(postId) } })
    useSetActiveFeed({ communityData: data?.post?.community })

    return (
        <PageContainer>
            <div className='h-[30px]' />
            {!data?.post && <h3>Post does not exist.</h3>}

            {data && data.post &&
                <div className='my-[30px]'>
                    <PostBox
                        post={data.post}
                        hideJoinBtn
                        isSinglePost
                        isEditing={options === 'edit'}
                        comments={data.post.comments && <CommentSection commentsData={data.post.comments} />}
                    />
                </div>
            }
        </PageContainer>

    )
}

export default SinglePostPage

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { params } = context

    if (!params) return {
        props: {
            isError: true,
        },
    }

    const postId = params.id as string

    const postIdInt = Number(postId)

    if (Number.isNaN(postIdInt)) {
        return {
            props: {
                isError: true,
            },
        }
    }

    try {
        const apolloClient = initializeApollo({ headers: context.req.headers })

        await apolloClient.query({
            query: PostDocument,
            variables: { postId: postIdInt }
        })

        return addApolloState(apolloClient, {
            props: {}
        })

    } catch (error) {
        return {
            props: {
                isError: true,
            },
        }
    }
}
