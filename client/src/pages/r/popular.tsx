import React, { useEffect } from 'react'
import { TrendingPosts, PageContainer, PageContentLayout, PopularCommunity, FilterBox, PostBox, UserHomeSidebar } from '@/components'
import { useMeQuery, usePostsQuery } from '@/generated/graphql'
import { setActiveFeedTab } from '@/action'
import { useGlobalState } from '@/hooks'
import { tabs } from '@/lib/constants'

function PopularPage() {
  const { dispatch } = useGlobalState()
  const { data } = usePostsQuery({ variables: { first: 10, after: null }, notifyOnNetworkStatusChange: true })
  const { data: meData } = useMeQuery()

  useEffect(() => {
    dispatch(setActiveFeedTab(tabs.popular))
  }, [])


  return (
    <PageContainer>
      <TrendingPosts />
      <h4 className='label-md mb-3'>Popular Posts</h4>
      <PageContentLayout
        containerClassname='mt-[40px]'
        left={<>
          <FilterBox />
          {/* POSTS */}
          <div className='flex-col-start-10 w-full'>
            {data?.posts.paginatedPosts.map(post => <PostBox post={post} />)}
          </div></>}
        right={meData?.me ? <UserHomeSidebar /> : <PopularCommunity />} />
    </PageContainer>
  )
}

export default PopularPage