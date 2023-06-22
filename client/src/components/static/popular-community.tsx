/* eslint-disable react/no-children-prop */
import React from 'react'
import ExpandCollapse from './collapse'

function PopularCommunity() {
    return (
        <>
            <ExpandCollapse
                title='POLULAR COMMUNITIES'
                children={<p className='flex gap-[10px] flex-wrap'><span className='hover:underline cursor-pointer text-gray'>content lorem</span><span className='hover:underline cursor-pointer text-gray'>ipsum</span><span className='hover:underline cursor-pointer text-gray'>sdslorem</span></p>}
            />
            <ExpandCollapse
                title='GAMING'
                children={<p className='flex gap-[10px] flex-wrap'><span className='hover:underline cursor-pointer text-gray'>content lorem</span><span className='hover:underline cursor-pointer text-gray'>ipsum</span><span className='hover:underline cursor-pointer text-gray'>sdslorem</span></p>}
            />
        </>
    )
}

export default PopularCommunity