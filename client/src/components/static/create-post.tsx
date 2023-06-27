import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CommunitySelect from './community-select'

type Tabs = {
    name: 'Post' | 'Image' | 'Link', icon: string
}
const tabs: Tabs[] = [{
    name: 'Post',
    icon: 'post',
},
{
    name: 'Image',
    icon: 'image',
}, {
    name: 'Link',
    icon: 'link',
}]

function CreatePost() {
    const [active, setActive] = useState<'Post' | 'Image' | 'Link'>('Post')

    return (
        <div className='mb-5 w-full flex-col-start-10'>
            <h2>Create a post</h2>
            <div className="h-[1px] w-full bg-white" />
            <CommunitySelect />
            {/* Tabs */}
            <div className='bg-white w-full'>
                <div className='w-full flex-around font-bold'>
                    {tabs.map(tab => <button type="button"
                        className={`flex-center gap-[8px] w-full py-3 border-b border-r border-medium hover:bg-primary-light ${tab.name === active ? 'text-cate-blue border-b-cate-blue' : 'text-gray'}`}
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
                <div className='p-2'>
                    {/* Title */}
                    <div className='relative rounded-sm border border-medium mt-2'>
                        <textarea maxLength={300} placeholder="Title" className=" w-full overflow-x-hidden break-words focus:outline-none py-1 pl-2 pr-[36px] max-h-[102px] resize-none" rows={1} />
                        <span className="absolute right-2 top-2 label-sm">9/300</span>
                    </div>
                    {/* Text */}
                    {active === 'Post' && <div className='rounded-sm border border-medium mt-2'>
                        <textarea name="create-post" className=' w-full font-light px-2 py-3 min-h-[150px] focus:outline-none' placeholder='Text'
                        />
                    </div>}
                    {active === 'Image' && <div className='rounded-sm border border-medium mt-2'>
                        <input type='file' accept="image/*" name="image" className='w-full font-light px-2 py-3 min-h-[150px] focus:outline-none' placeholder='Upload file'
                        />
                    </div>}
                    {active === 'Link' && <div className='rounded-sm border border-medium mt-2'>
                        <textarea name="create-post" className=' w-full font-light px-2 py-3 min-h-[150px] focus:outline-none' placeholder='Url'
                        />
                    </div>}
                    {/* Post Btn */}
                    <div className='flex-end gap-[10px] p-2'>
                        <Link href='/static' className='button-main-outline'>Cancel</Link>
                        <button type="button" className='button-main'>Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost