import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

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

function EditPost({ hideEdit }: { hideEdit: () => void }) {
    const router = useRouter();
    const [form, setForm] = useState({ title: '', text: '' })
    const { media, url } = router.query;

    const getActiveTab = () => {
        if (media && media === 'true') { return 'Image' }
        if (url && url === 'true') { return 'Link' }
        return 'Post'
    }
    const [active, setActive] = useState<'Post' | 'Image' | 'Link'>(getActiveTab())

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }))
    }

    return (<div className='mb-5 w-full flex-col-start-10'>
        <div className="h-[1px] w-full bg-white" />
        <form className='w-full' onSubmit={(e) => e.preventDefault()}>
            {/* Tabs */}
            <div className='bg-white w-full'>
                <div className='w-full flex-around font-bold'>
                    {tabs.map(tab => <button
                        key={tab.name}
                        type="button"
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
                <div className='p-2 min-h-[280px]'>
                    {/* Text */}
                    {active === 'Post' && <div className='rounded-sm border border-medium mt-2'>
                        <textarea id="text"
                            name="text"
                            onChange={(e) => handleChange(e)}
                            value={form.text}
                            className=' w-full font-light px-2 py-3 min-h-[150px] focus:outline-none' placeholder='Text'
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
                        <button type='button' onClick={hideEdit} className='button-main-outline'>Cancel</button>
                        <button type="submit" className='button-main'>Save</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    )
}

export default EditPost