import React from 'react'
import CreatePostFragment from './create-post-fragment'
import FilterBox from './filter-box'
import PostBox from './post-box'
import PopularCommunity from './popular-community'

const data = {
    id: 1, points: 1523, title: 'Post title Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, maiores? Voluptatem dolore temporibus perferendis ipsam facere accusantium numquam quos cupiditate ratione. Nesciunt in saepe nemo perferendis molestias minus autem fugiat!', username: 'hongng2182hfg', textSnippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, maiores? Voluptatem dolore temporibus perferendis ipsam facere accusantium numquam quos cupiditate ratione. Nesciunt in saepe nemo perferendis molestias minus autem fugiat!',
    community: 'ressit101',
    createdAt: '16 hours'
}

function Posts() {
    return (
        <div className="w-full ">
            <h4 className='label-md mb-3'>Popular Posts</h4>
            <div className='flex justify-between mb-5'>
                <div className='_995:max-w-[640px]  _995:w-[calc(100%-330px)] w-full flex-col-start-10'>
                    <CreatePostFragment />
                    <FilterBox />
                    {/* POSTS */}
                    <div className='flex-col-start-10 w-full'>
                        {[data, data, data].map(post => <PostBox post={post} />)}
                    </div>
                </div>
                <div className='_995M:hidden sm:w-[310px] h-[300px] white-gray-rounded'>
                    <PopularCommunity />
                </div>
            </div>
        </div>
    )
}

export default Posts