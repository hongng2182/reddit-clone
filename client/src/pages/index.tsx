import React, { useEffect } from 'react'
import { NetworkStatus } from "@apollo/client"
import { PageContainer, PageContentLayout, CreatePostFragment, PostBox, UserHomeSidebar, PopularCommunity, PostBoxSkeleton } from '@/components'
import { useMeQuery, usePostsQuery } from '@/generated/graphql'
import { ArrayOfThree, FETCH_LIMIT, tabs } from "@/lib/constants"
import { LoadingIcon } from '@/components/icons'
import { setActiveFeedTab } from '@/action'
import { useGlobalState, useInfiniteLoading } from '@/hooks'

function HomePage() {
    const { dispatch } = useGlobalState()
    const { data: meData } = useMeQuery()
    const { data, fetchMore, networkStatus, loading: postsLoading } = usePostsQuery({ variables: { first: FETCH_LIMIT, after: null }, notifyOnNetworkStatusChange: true })
    const isLoadingMorePosts = networkStatus === NetworkStatus.fetchMore

    const { lastElement } = useInfiniteLoading({
        fetchMore: () => {
            fetchMore({ variables: { first: FETCH_LIMIT, after: data?.posts.pageInfo.endCursor } })
        },
        hasNextPage: data?.posts?.pageInfo.hasNextPage,
        isLoadingMore: isLoadingMorePosts
    })

    useEffect(() => {
        dispatch(setActiveFeedTab(tabs.home))
    }, [dispatch])


    return (
        <PageContainer>
            <PageContentLayout
                containerClassname='mt-[40px]'
                left={<>
                    {meData?.me && !postsLoading && <CreatePostFragment meData={meData} />}
                    {/* POSTS */}
                    <div className='flex-col-start-10 w-full'>
                        {data?.posts.paginatedPosts && data?.posts.paginatedPosts.map((post, index) =>
                            index === data.posts.paginatedPosts.length - 1 ? <div key={post.id} ref={lastElement} className='w-full'>
                                <PostBox post={post} />
                            </div>
                                : <PostBox key={post.id} post={post} />)}
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
    )
}

export default HomePage

// NOTE: This won't work if domain in BE and FE is different. Header cookie will not be sent along the request!

// export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

//     const apolloClient = initializeApollo({ headers: context.req.headers })

//     await apolloClient.query({
//         query: PostsDocument,
//         variables: { first: FETCH_LIMIT, after: null }
//     })

//     return addApolloState(apolloClient, {
//         props: {}
//     })
// }