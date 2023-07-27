import React, { useEffect } from 'react'
import { NetworkStatus } from '@apollo/client'
import { PageContainer, PageContentLayout, PopularCommunity, PostBox, UserHomeSidebar, PostBoxSkeleton } from '@/components'
import { useMeQuery, usePopularPostsQuery } from '@/generated/graphql'
import { setActiveFeedTab } from '@/action'
import { useGlobalState, useInfiniteLoading } from '@/hooks'
import { ArrayOfThree, FETCH_LIMIT, tabs } from '@/lib/constants'

function PopularPage() {
  const { dispatch } = useGlobalState()
  const { data, loading: postsLoading, networkStatus, fetchMore } = usePopularPostsQuery({ variables: { first: 10, after: null }, notifyOnNetworkStatusChange: true })
  const isLoadingMorePosts = networkStatus === NetworkStatus.fetchMore

  const { data: meData } = useMeQuery()

  useEffect(() => {
    dispatch(setActiveFeedTab(tabs.popular))
  }, [dispatch])

  const { lastElement } = useInfiniteLoading({
    fetchMore: () => {
      fetchMore({ variables: { first: FETCH_LIMIT, after: data?.popularPosts.pageInfo.endCursor } })
    },
    hasNextPage: data?.popularPosts?.pageInfo.hasNextPage,
    isLoadingMore: isLoadingMorePosts
  })

  return (
    <PageContainer title="MiniReddit - r/Popular">
      <h4 className='label-md mt-3'>Popular Posts</h4>
      <PageContentLayout
        containerClassname='mt-[20px]'
        left={<>
          {/* POSTS */}
          <div className='flex-col-start-10 w-full'>
            {data?.popularPosts.paginatedPosts && data?.popularPosts.paginatedPosts.map((post, index) =>
              index === data.popularPosts.paginatedPosts.length - 1 ? <div key={post.id} ref={lastElement} className='w-full'>
                <PostBox post={post} />
              </div>
                : <PostBox key={post.id} post={post} />)}
            {(postsLoading || isLoadingMorePosts) && ArrayOfThree.map(item => <PostBoxSkeleton key={item} />)}
          </div></>}
        right={meData?.me ? <UserHomeSidebar /> : <PopularCommunity />} />
    </PageContainer>
  )
}

export default PopularPage