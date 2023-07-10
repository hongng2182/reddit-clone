import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { NetworkStatus } from "@apollo/client"
import { addApolloState, initializeApollo } from "@/lib/apolloClient"
import { PageContainer, PageContentLayout, CreatePostFragment, FilterBox, PostBox, UserHomeSidebar, PopularCommunity } from '@/components'
import { PostsDocument, useMeQuery, usePostsQuery } from '@/generated/graphql'
import { FETCH_LIMIT } from '@/types'

function HomePage() {
    const {data: meData} = useMeQuery()
    const { data, fetchMore, networkStatus } = usePostsQuery({ variables: { first: FETCH_LIMIT, after: null }, notifyOnNetworkStatusChange: true })
    const isLoadingMorePosts = networkStatus === NetworkStatus.fetchMore

    return (
        <PageContainer>
            <PageContentLayout
                containerClassname='mt-[40px]'
                left={<><CreatePostFragment />
                    <FilterBox />
                    {/* POSTS */}
                    <div className='flex-col-start-10 w-full'>
                        {data?.posts.paginatedPosts.map(post => <PostBox key={post.id} post={post} />)}
                        {
                            data?.posts.pageInfo.hasNextPage &&
                            <button
                                type="button"
                                className='button-main'
                                onClick={() => fetchMore({ variables: { first: FETCH_LIMIT, after: data?.posts.pageInfo.endCursor } })}>
                                {isLoadingMorePosts ? 'Loading' : 'Load more'}
                            </button>
                        }
                    </div></>}
                right={meData?.me ? <UserHomeSidebar/> : <PopularCommunity/>} />
        </PageContainer>
    )
}

export default HomePage

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

    const apolloClient = initializeApollo({ headers: context.req.headers })

    await apolloClient.query({
        query: PostsDocument,
        variables: { first: FETCH_LIMIT, after: null }
    })

    return addApolloState(apolloClient, {
        props: {}
    })
}