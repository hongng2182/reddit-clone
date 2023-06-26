/* eslint-disable react/no-children-prop */
import React from 'react'
import { useRouter } from 'next/router'
import ExpandCollapse from './collapse'

function PopularCommunity() {
    // TODO: return list of popular community
    const router = useRouter()
    const communities = ['lorem', 'ipsum', 'loremipsum']
    return (
        <div className='h-[300px] w-full'>
            <ExpandCollapse
                title='POLULAR COMMUNITIES'
                children={<p className='flex gap-[10px] flex-wrap'>
                    {communities.map(com => <span key={com}
                        onClick={() => router.push(`/static/r/${com}`)}
                        className='hover:underline cursor-pointer text-gray'>{com}</span>)}
                </p>}
            />
            <ExpandCollapse
                title='GAMING'
                children={<p className='flex gap-[10px] flex-wrap'>{communities.map(com => <span key={com}
                    onClick={() => router.push(`/static/r/${com}`)}
                    className='hover:underline cursor-pointer text-gray'>{com}</span>)}</p>}
            />
        </div>
    )
}

export default PopularCommunity