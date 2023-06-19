/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react'
import Image from 'next/image'
import { DropdownIcon } from '../icons'

const constants = [{
    title: 'FEEDS',
    sub_feed: [{
        icon: 'home',
        name: 'Home'
    },
    { icon: 'arrow', name: 'Popular' }],
},
{
    title: 'YOUR COMMUNITIES',
    sub_feed: [{
        icon: 'add',
        name: 'Create Community'
    }],
    communities: [{
        imgSrc: '/logo-cat.png',
        name: 'r/community'
    }]
},
{
    title: 'OTHER',
    sub_feed: [{
        icon: 'add',
        name: 'Create Post'
    }],
}]

function Feed() {
    const [activeTab, setActiveTab] = useState<{
        icon: string,
        name: string
    }>({
        icon: 'home',
        name: 'Home'
    })

    const [showTab, setShowTab] = useState(false)

    return (
        <div className="bg-white relative _995:w-[270px]">
            <div className={`w-full font-bold h-[40px] border hover:border-medium rounded-[4px] p-[5px] flex-between gap-[10px] cursor-pointer ${showTab ? 'border-medium' : 'border-transparent'}`}
                onClick={() => setShowTab(!showTab)}
            >
                <span className='flex gap-[10px]'>
                    <Image
                        alt='img'
                        width='20'
                        height='20'
                        src={`/icons/${activeTab.icon}-fill.svg`}
                    />
                    <span className='_995M:hidden'>{activeTab.name}</span>
                </span>
                <span><DropdownIcon width={20} fill='#000' /></span>
            </div>
            {showTab && <div className="w-[270px] absolute top-[38px] h-[400px] flex flex-col gap-[10px] bg-white border border-medium border-t-0 z-0">
                {constants.map(menu =>
                    <>
                        <h4 className='feed-tab'>{menu.title}</h4>
                        {menu.sub_feed.map(item => <button
                            type='button'
                            className="feed-tab flex-start gap-[10px] hover:bg-light cursor-pointer"
                            onClick={() => {
                                setActiveTab(item)
                                setShowTab(false)
                            }}
                        >
                            <Image
                                alt='img'
                                width='20'
                                height='20'
                                src={`/icons/${item.icon}-outline.svg`}
                            />
                            <span>{item.name}</span>
                        </button >)}
                        {menu.communities &&
                            menu.communities.map(community => <button
                                type='button'
                                className="feed-tab flex gap-[10px] cursor-pointer hover:bg-light"
                            >
                                <div className='w-[24px] h-[24px]'>
                                    <Image
                                        alt='community'
                                        width='0'
                                        height='0'
                                        src={community.imgSrc}
                                        sizes='100%'
                                        className='w-auto rounded-full'
                                    />
                                </div>
                                <span>{community.name}</span>
                            </button>)
                        }
                    </>
                )}
            </div>}
        </div >
    )
}

export default Feed