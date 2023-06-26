import React from 'react'
import { CreatePostFragment, PageContentLayout, PageContainer, FilterBox, PostBox, CommunityBanner, CommunityInfo } from '@/components'
import { mockup_post_data } from '@/mockup'

function CommunityPage() {
    return (
        <>
            <CommunityBanner />
            <PageContainer withFeed={false}>
                <PageContentLayout
                    left={<>
                        <CreatePostFragment />
                        <FilterBox />
                        <div className='flex-col-start-10 w-full'>
                            {[mockup_post_data, mockup_post_data, mockup_post_data].map(post => <PostBox post={post} hideCommunity hideJoinBtn />)}
                        </div>
                    </>}
                    right={<CommunityInfo />}
                />
            </PageContainer>
        </>
    )
}

export default CommunityPage