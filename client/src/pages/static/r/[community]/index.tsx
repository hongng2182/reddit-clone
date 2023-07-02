import React from 'react'
import { CreatePostFragment, PageContentLayout, PageContainer, FilterBox, PostBox, CommunityBanner, CommunityInfo } from '@/components'
import { usePostsQuery } from '@/generated/graphql'

const FETCH_LIMIT = 10

function CommunityPage() {
    const { data } = usePostsQuery({ variables: { first: FETCH_LIMIT, after: null }, notifyOnNetworkStatusChange: true })

    return (
        <>
            <CommunityBanner />
            <PageContainer>
                <PageContentLayout
                    left={<>
                        <CreatePostFragment />
                        <FilterBox />
                        <div className='flex-col-start-10 w-full'>
                            {data?.posts.paginatedPosts.map(post => <PostBox post={post} hideCommunity hideJoinBtn />)}
                        </div>
                    </>}
                    right={<CommunityInfo />}
                />
            </PageContainer>
        </>
    )
}

export default CommunityPage