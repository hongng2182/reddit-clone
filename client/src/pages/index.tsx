import React, { useEffect } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import Head from 'next/head'
import { NetworkStatus } from "@apollo/client"
import { addApolloState, initializeApollo } from "@/lib/apolloClient"
import { PageContainer, PageContentLayout, CreatePostFragment, FilterBox, PostBox, UserHomeSidebar, PopularCommunity, PostBoxSkeleton } from '@/components'
import { PostsDocument, useMeQuery, usePostsQuery } from '@/generated/graphql'
import { ArrayOfThree, FETCH_LIMIT, tabs } from "@/lib/constants"
import { LoadingIcon } from '@/components/icons'
import { setActiveFeedTab } from '@/action'
import { useGlobalState } from '@/hooks'

function HomePage() {
    const { dispatch } = useGlobalState()
    const { data: meData } = useMeQuery()
    const { data, fetchMore, networkStatus, loading: postsLoading } = usePostsQuery({ variables: { first: FETCH_LIMIT, after: null }, notifyOnNetworkStatusChange: true })
    const isLoadingMorePosts = networkStatus === NetworkStatus.fetchMore

    useEffect(() => {
        dispatch(setActiveFeedTab(tabs.home))
    }, [])

    console.log('post loading', postsLoading)

    return (
        <>
            <Head>
                <title>Mini Reddit</title>
            </Head>
            <PageContainer>
                <PageContentLayout
                    containerClassname='mt-[40px]'
                    left={<>
                        {meData?.me && !postsLoading && <CreatePostFragment meData={meData} />}
                        <FilterBox />
                        {/* POSTS */}
                        <div className='flex-col-start-10 w-full'>
                            {data?.posts.paginatedPosts.map(post => <PostBox key={post.id} post={post} />)}
                            {postsLoading && ArrayOfThree.map(item => <PostBoxSkeleton key={item} />)}
                            {data?.posts.pageInfo.hasNextPage &&
                                <button
                                    type="button"
                                    className='button-main'
                                    onClick={() => fetchMore({ variables: { first: FETCH_LIMIT, after: data?.posts.pageInfo.endCursor } })}>
                                    {isLoadingMorePosts ? <LoadingIcon /> : 'Load more'}
                                </button>}

                        </div>
                    </>}
                    right={meData?.me ? <UserHomeSidebar /> : <PopularCommunity />} />
            </PageContainer>
        </>
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