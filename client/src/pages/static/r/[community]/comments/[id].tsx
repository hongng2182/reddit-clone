/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useRouter } from 'next/router'
import { PostDocument, usePostQuery } from '@/generated/graphql'
import { addApolloState, initializeApollo } from '@/lib/apolloClient'
import { PageContentLayout, PageContainer, PostBox, CommunityInfo, CommentSection } from '@/components'

function SinglePostPage({ isError: isErrorFromServer }: { isError: boolean }) {
    if (isErrorFromServer) {
        return <div>An errorn has happen</div>
    }
    const router = useRouter()
    const postId = router.query.id as string
    const {options} = router.query
    const { data } = usePostQuery({ variables: { postId: Number(postId) } })

    return (
        <PageContainer>
            <div className='h-[30px]' />
            {!data?.post && <p>Post does not exist</p>}
            <PageContentLayout
                left={data && data.post && <PostBox
                    post={data.post}
                    hideJoinBtn
                    isSinglePost
                    isEditing={options === 'edit'}
                    comments={<CommentSection />} />}
                right={<CommunityInfo />}
            />
        </PageContainer>

    )
}

export default SinglePostPage

export const getServerSideProps = async (context: any) => {
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
        const apolloClient = initializeApollo()

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
