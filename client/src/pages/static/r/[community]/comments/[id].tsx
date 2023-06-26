import React from 'react'
import { mockup_post_data } from '@/mockup'
import { PageContentLayout, PageContainer, PostBox, CommunityInfo, CommentSection } from '@/components'

function CommunitySinglePostPage() {

    return (
        <PageContainer withFeed={false}>
            <div className='h-[30px]' />
            <PageContentLayout
                left={<PostBox
                    post={mockup_post_data}
                    hideJoinBtn
                    comments={<CommentSection />} />}
                right={<CommunityInfo />}
            />
        </PageContainer>

    )
}

export default CommunitySinglePostPage