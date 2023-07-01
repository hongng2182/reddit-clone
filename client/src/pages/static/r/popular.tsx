import React from 'react'
import { TrendingPosts, PageContainer, PageContentLayout, PopularCommunity, FilterBox, PostBox } from '@/components'
import { mockup_post_data } from '@/mockup'

// TODO: Not login - Popular communities, login- create-post/community

function PopularPage() {
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
            {[mockup_post_data, mockup_post_data, mockup_post_data].map(post => <PostBox post={post} />)}
          </div></>}
        right={<PopularCommunity />} />
    </PageContainer>
  )
}

export default PopularPage