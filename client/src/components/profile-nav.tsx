import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { userPageTabs } from '@/lib/constants'
import { MeQuery } from '@/generated/graphql'

function ProfileNav({ activeTab, username, meData }: { activeTab: string, username: string, meData: MeQuery | undefined }) {
    const router = useRouter()
    const [active, setActive] = useState(activeTab)
    const [showTab, setshowTab] = useState(false)

    if (meData === undefined ) {
        return <div className='h-[42px] border-t border-medium bg-white' />
    }
    const isProfileOwner = username === meData?.me?.username
    const shownTabs = !isProfileOwner || meData?.me === null ? userPageTabs.slice(0, 2) : userPageTabs
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
                {isProfileOwner && <button type='button' className="relative px-4 py-2 font-bold hover:text-cate-blue md:hidden"
                    onMouseEnter={() => setshowTab(true)}
                    onMouseLeave={() => setshowTab(false)}
                >...
                    {showTab && <div className='absolute bg-white border-medium right-0 top-[40px]'>
                        {userPageTabs.slice(3,).map((tab) => <button key={tab.name} type='button'
                            className={`px-4 py-2 font-bold w-full hover:bg-primary-light text-black
                    ${active === tab.name ? 'text-cate-blue' : ''}
                    `}
                            onClick={() => {
                                setActive(tab.name)
                                router.push(tab.url.replace('[username]', username))
                            }}
                        >{tab.name}</button>
                        )}</div>}
                </button>}
            </div>
        </div>
    )
}

export default ProfileNav