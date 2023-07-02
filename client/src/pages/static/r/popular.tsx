import React from 'react'
import { TrendingPosts, PageContainer, PageContentLayout, PopularCommunity, FilterBox, PostBox } from '@/components'
import { usePostsQuery } from '@/generated/graphql'

// TODO: Not login - Popular communities, login- create-post/community

function PopularPage() {
  const { data } = usePostsQuery({ variables: { first: 10, after: null }, notifyOnNetworkStatusChange: true })

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
        right={<PopularCommunity />} />
    </PageContainer>
  )
}

export default PopularPage