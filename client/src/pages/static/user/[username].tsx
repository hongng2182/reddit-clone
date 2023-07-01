import React, { useState } from 'react'
import { PageContainer, PageContentLayout, PostBox } from '@/components'
import { mockup_post_data } from '@/mockup'

type Tabs = {
    name: string, icon: string
}
const tabs: Tabs[] = [
    {
        name: 'POSTS',
        icon: 'new',
    }, {
        name: 'COMMENTS',
        icon: 'top',
    }, {
        name: 'SAVED',
        icon: 'top',
    }, {
        name: 'UPVOTED',
        icon: 'top',
    }, {
        name: 'DOWNVOTED',
        icon: 'top',
    }]

// TODO: public show Overview, pots, comments. Private show remained

function UserPage() {
    const [active, setActive] = useState('OVERVIEW')
    const [showTab, setshowTab] = useState(false)
    return (
        <>
            <div className='border-t border-medium bg-white'>
                <div className='xl:w-[1020px] w-[90%] mx-auto flex-center'>
                    {tabs.map((tab, index) => <button key={tab.name} type='button' className={`px-4 py-2 font-bold hover:text-cate-blue border-b-2 ${active === tab.name ? 'text-cate-blue border-cate-blue' : 'border-transparent'}
                    ${index >= 3 ? 'mdM:hidden' : ''}
                    `}
                        onClick={() => setActive(tab.name)}
                    >{tab.name}</button>
                    )}
                    <button type='button' className={`relative px-4 py-2 font-bold hover:text-cate-blue md:hidden
                    `}
                        onMouseEnter={() => setshowTab(true)}
                        onMouseLeave={() => setshowTab(false)}
                    >...
                        {showTab && <div className='absolute bg-white border-medium right-0 top-[40px]'>
                            {tabs.slice(3,).map((tab) => <button key={tab.name} type='button'
                                className={`px-4 py-2 font-bold w-full hover:bg-primary-light text-black
                    ${active === tab.name ? 'text-cate-blue' : ''}
                    `}
                                onClick={() => setActive(tab.name)}
                            >{tab.name}</button>
                            )}</div>}
                    </button>
                </div>
            </div>
            <PageContainer>
                <PageContentLayout
                    containerClassname='mt-[40px]'
                    left={<>
                        {/* POSTS */}
                        <div className='flex-col-start w-full'>
                            {active === 'POSTS' && [mockup_post_data].map(post => <PostBox post={post} />)}
                            {active === 'COMMENTS' && <><div className='border-transparent hover:border-gray cursor-pointer white-gray-rounded w-full'>
                                <span>user</span> commented on <span>post</span> <span>community</span> posted by <span>username</span>
                            </div>
                                <div className='border-transparent hover:border-gray cursor-pointer white-gray-rounded w-full'>
                                    <span>user</span> commented on <span>post</span> <span>community</span> posted by <span>username</span>
                                </div></>}
                            {active === 'SAVED' && <div className='border-transparent hover:border-gray cursor-pointer white-gray-rounded w-full'>
                                Saved posts
                            </div>}
                            {active === 'UPVOTED' && <div className='border-transparent hover:border-gray cursor-pointer white-gray-rounded w-full'>
                                Upvoted Post
                            </div>}
                            {active === 'DOWNVOTED' && <div className='border-transparent hover:border-gray cursor-pointer white-gray-rounded w-full'>
                                Downvoted posts
                            </div>}
                        </div>
                    </>}
                    right={<p>Userinfo</p>} />
            </PageContainer>
        </>
    )
}

export default UserPage