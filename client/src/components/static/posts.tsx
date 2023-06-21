/* eslint-disable react/no-children-prop */
import React, { useState } from 'react'
import Image from 'next/image'
import { ArrowUpDown, CommentIcon, ShareIcon, SaveIcon } from '../icons'
import ExpandCollapse from './collapse'

type Tabs = {
    name: 'Top' | 'Hot' | 'New', icon: string
}
const tabs: Tabs[] = [{
    name: 'Hot',
    icon: 'hot',
},
{
    name: 'New',
    icon: 'new',
}, {
    name: 'Top',
    icon: 'top',
}]

const data = {
    id: 1, points: 1523, title: 'Post title Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, maiores? Voluptatem dolore temporibus perferendis ipsam facere accusantium numquam quos cupiditate ratione. Nesciunt in saepe nemo perferendis molestias minus autem fugiat!', username: 'hongng2182', textSnippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, maiores? Voluptatem dolore temporibus perferendis ipsam facere accusantium numquam quos cupiditate ratione. Nesciunt in saepe nemo perferendis molestias minus autem fugiat!',
    community: 'ressit101',
    createdAt: '16 hours'
}

function Posts() {
    const [active, setActive] = useState<'Top' | 'Hot' | 'New'>('Hot')
    return (
        <div className="w-full ">
            <h4 className='label-md mb-3'>Popular Posts</h4>
            <div className='flex justify-between mb-5'>
                <div className='_995:max-w-[640px]  _995:w-[calc(100%-330px)] w-full flex-col-start-10'>
                    <div className='w-full h-[61px] flex-start-10 px-4 py-3 font-bold white-gray-rounded'>
                        {tabs.map(tab => <button type="button"
                            className={`filter-post hover:bg-medium ${tab.name === active ? 'text-cate-blue bg-light' : 'text-gray'}`}
                            onClick={() => { setActive(tab.name) }}>
                            <Image
                                alt={tab.name}
                                src={tab.name === active ? `/icons/${tab.icon}-fill.svg` : `/icons/${tab.icon}-outline.svg`}
                                height='0'
                                width='0'
                                className='w-[20px] h-[20px]'
                            />
                            {tab.name}</button>)}
                    </div>
                    <div className='flex-col-start-10 w-full'>
                        {[data, data, data].map(post => <div className='white-gray-rounded w-full flex cursor-pointer'>
                            <div className='w-[40px] bg-light text-xs font-bold p-1 flex-col-start gap-[8px]' id='upvote'>
                                <ArrowUpDown type='up' className='mx-auto hover:bg-medium hover:fill-secondary' />
                                <span className='mx-auto'>{post.points}</span>
                                <ArrowUpDown type='down' className='mx-auto hover:bg-medium hover:fill-primary' />
                            </div>
                            <div className='w-full p-2 flex-col-start-10'>
                                <div className='flex-between w-full'>
                                    <div className='text-xs flex'>
                                        <div className='flex-start gap-[5px]'>
                                            <Image
                                                width='0'
                                                height='0'
                                                alt='avatar'
                                                src='/logo-cat.png'
                                                className='w-[14px] h-[14px] rounded-full'
                                            />
                                            <span className='font-bold hover:underline'>r/{post.community}</span>
                                        </div>
                                        <span className='text-gray'>&nbsp;•&nbsp;Posted by <span className='hover:underline'>
                                            u/{post.username}</span> {post.createdAt} ago</span>
                                    </div>
                                    <button type="button" className='text-sm button-light hover:bg-medium'>Join</button>
                                </div>
                                <h2 className='pr-3'>{post.title}</h2>
                                <p>{post.textSnippet}</p>
                                <div className='text-xs flex-start-10'>
                                    <div className='post-action'>
                                        <CommentIcon />
                                        25 Comments
                                    </div>
                                    <div className='post-action'>
                                        <ShareIcon />
                                        Share
                                    </div>
                                    <div className='post-action'>
                                        <SaveIcon />
                                        Save
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
                <div className='_995M:hidden sm:w-[310px] h-[300px] white-gray-rounded'>
                    <ExpandCollapse
                        title='POLULAR COMMUNITIES'
                        children={<p>Content Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>}
                    />
                    <ExpandCollapse
                        title='GAMING'
                        children={<p>Content Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>}
                    />
                </div>
            </div>
        </div>
    )
}

export default Posts