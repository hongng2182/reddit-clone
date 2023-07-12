import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { useCreatePostMutation } from '@/generated/graphql'
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
    const router = useRouter();
    const [form, setForm] = useState({ title: '', text: '' })
    const [createPost, { loading, error }] = useCreatePostMutation()
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
    if (loading) { return <div>Loading</div> }

    if (error) {
        return <div>An error has happened!</div>
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await createPost({
                variables: { input: form }
            })
            if (response.data?.createPost) {
                router.push('/')
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='mb-5 w-full flex-col-start-10'>
            <h2>Create a post</h2>
            <div className="h-[1px] w-full bg-white" />
            <form className='w-full' autoComplete='off' onSubmit={(e) => handleSubmit(e)}>
                <CommunitySelect />
                {/* Tabs */}
                <div className='bg-white w-full mt-2'>
                    <div className='w-full flex-around font-bold'>
                        {tabs.map(tab => <button key={tab.name} type="button"
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
                        {/* Title */}
                        <div className='relative rounded-sm border border-medium mt-2'>
                            <textarea maxLength={300} placeholder="Title" className=" w-full overflow-x-hidden break-words focus:outline-none py-1 pl-2 pr-[36px] max-h-[102px] resize-none" rows={1}
                                id="title"
                                name="title"
                                value={form.title}
                                onChange={(e) => handleChange(e)} />
                            <span className="absolute right-2 top-2 label-sm">9/300</span>
                        </div>
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
                            <Link href='/static' className='button-main-outline'>Cancel</Link>
                            <button type="submit" className='button-main'>Post</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreatePost