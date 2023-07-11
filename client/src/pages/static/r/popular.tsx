import React from 'react'
import { TrendingPosts, PageContainer, PageContentLayout, PopularCommunity, FilterBox, PostBox, UserHomeSidebar } from '@/components'
import { useMeQuery, usePostsQuery } from '@/generated/graphql'

function PopularPage() {
  const { data } = usePostsQuery({ variables: { first: 10, after: null }, notifyOnNetworkStatusChange: true })
  const { data: meData } = useMeQuery()

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