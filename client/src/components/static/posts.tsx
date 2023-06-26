import React from 'react'
import { mockup_post_data } from '@/mockup'
import CreatePostFragment from './create-post-fragment'
import FilterBox from './filter-box'
import PostBox from './post-box'
import PopularCommunity from './popular-community'
import PageContentLayout from './page-content-layout'

function Posts() {
    return (
        <div className="w-full">
            <h4 className='label-md mb-3'>Popular Posts</h4>
            <PageContentLayout
                left={<><CreatePostFragment />
                    <FilterBox />
                    {/* POSTS */}
                    <div className='flex-col-start-10 w-full'>
                        {[mockup_post_data, mockup_post_data, mockup_post_data].map(post => <PostBox post={post} />)}
                    </div></>}
                right={<PopularCommunity />} />
        </div>
    )
}

export default Posts