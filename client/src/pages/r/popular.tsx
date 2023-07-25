import React, { useEffect } from 'react'
import { PageContainer, PageContentLayout, PopularCommunity, FilterBox, PostBox, UserHomeSidebar, PostBoxSkeleton } from '@/components'
import { useMeQuery, usePostsQuery } from '@/generated/graphql'
import { setActiveFeedTab } from '@/action'
import { useGlobalState } from '@/hooks'
import { ArrayOfThree, tabs } from '@/lib/constants'

function PopularPage() {
  const { dispatch } = useGlobalState()
  const { data, loading } = usePostsQuery({ variables: { first: 10, after: null }, notifyOnNetworkStatusChange: true })
  const { data: meData } = useMeQuery()

  useEffect(() => {
    dispatch(setActiveFeedTab(tabs.popular))
  }, [])


  return (
    <PageContainer>
      <h4 className='label-md mt-3'>Popular Posts</h4>
      <PageContentLayout
        containerClassname='mt-[20px]'
        left={<>
          <FilterBox />
          {/* POSTS */}
          <div className='flex-col-start-10 w-full'>
            {data?.posts.paginatedPosts.map(post => <PostBox key={post.id} post={post} />)}
            {loading && ArrayOfThree.map(item => <PostBoxSkeleton key={item} />)}
          </div></>}
        right={meData?.me ? <UserHomeSidebar /> : <PopularCommunity />} />
    </PageContainer>
  )
}

export default PopularPage