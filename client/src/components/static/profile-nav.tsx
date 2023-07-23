import { MeQuery } from '@/generated/graphql'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

type Tabs = {
    name: string, icon: string, url: string
}
const tabs: Tabs[] = [
    {
        name: 'POSTS',
        icon: 'new',
        url: '/static/user/[username]'
    }, {
        name: 'COMMENTS',
        icon: 'top',
        url: '/static/user/[username]/comments'
    },
    {
        name: 'UPVOTED',
        icon: 'top',
        url: '/static/user/[username]/upvotes'
    }, {
        name: 'DOWNVOTED',
        icon: 'top',
        url: '/static/user/[username]/downvotes'
    }]


function ProfileNav({ activeTab, username, meData }: { activeTab: string, username: string, meData: MeQuery | undefined }) {
    const router = useRouter()
    const [active, setActive] = useState(activeTab)
    const [showTab, setshowTab] = useState(false)
    const isProfileOwner = username === meData?.me?.username

    const shownTabs = isProfileOwner ? tabs : tabs.slice(0, 2)

    return (
        <div className='border-t border-medium bg-white'>
            <div className='xl:w-[1020px] w-[90%] mx-auto flex-center'>
                {shownTabs.map((tab, index) => <button key={tab.name} type='button' className={`px-4 py-2 font-bold hover:text-cate-blue border-b-2 ${active === tab.name ? 'text-cate-blue border-cate-blue' : 'border-transparent'}
                    ${index >= 3 ? 'mdM:hidden' : ''}
                    `}
                    onClick={() => {
                        setActive(tab.name)
                        router.push(tab.url.replace('[username]', username))
                    }}
                >{tab.name}</button>)}
                <button type='button' className="relative px-4 py-2 font-bold hover:text-cate-blue md:hidden"
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
    )
}

export default ProfileNav