import React from 'react'
import { PageContainer, PageContentLayout, CreatePostFragment, FilterBox, PostBox } from '@/components'
import { mockup_post_data } from '@/mockup'

function HomePage() {
    return (
        <PageContainer>
            <PageContentLayout
                containerClassname='mt-[40px]'
                left={<><CreatePostFragment />
                    <FilterBox />
                    {/* POSTS */}
                    <div className='flex-col-start-10 w-full'>
                        {[mockup_post_data, mockup_post_data, mockup_post_data].map(post => <PostBox post={post} />)}
                    </div></>}
                right={<p>Try, create post</p>} />
        </PageContainer>
    )
}

export default HomePage