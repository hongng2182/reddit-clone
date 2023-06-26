import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { PictureIcon, LinkIcon } from '../icons'

function CreatePostFragment() {
    const router = useRouter()

    return (
        <div className='w-full h-[61px] flex-around px-4 py-3 font-bold white-gray-rounded'>
            <Image
                alt='avatar'
                src='/demo.png'
                height='0'
                width='0'
                sizes='100%'
                className='w-[40px] h-[40px] rounded-full mr-2'
            />
            <div className='h-[40px] w-[70%] bg-light  hover-border-blue rounded-sm px-2'>
                <input name="create-post" className='h-[95%] my-auto font-light pl-2' placeholder='Create Post' readOnly
                    onFocus={() => router.push('/static/submit')} />
            </div>
            <div className="p-2 hover:bg-medium cursor-pointer rounded-sm"><PictureIcon /></div>
            <div className="p-2 hover:bg-medium cursor-pointer rounded-sm"><LinkIcon /></div>
        </div>
    )
}

export default CreatePostFragment