import React, { useState } from 'react'
import Image from 'next/image'

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

function FilterBox() {
    const [active, setActive] = useState<'Top' | 'Hot' | 'New'>('Hot')

    return (
        <div className='w-full h-[61px] flex-start-10 px-4 py-3 font-bold white-gray-rounded'>
            {tabs.map(tab => <button type="button" key={tab.name}
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
    )
}

export default FilterBox