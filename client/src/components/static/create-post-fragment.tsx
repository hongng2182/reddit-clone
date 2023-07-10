import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { PictureIcon, LinkIcon } from '../icons'

function CreatePostFragment({ pathname = '/static/submit' }: { pathname?: string }) {
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
            <div className='h-[40px] w-[70%] bg-light  hover-border-blue rounded-sm'>
                <input name="create-post" className='h-full my-auto font-light w-full pl-2' placeholder='Create Post' readOnly
                    onFocus={() => router.push(pathname)} />
            </div>
            <div className="p-2 hover:bg-medium cursor-pointer rounded-sm" onClick={() => router.push({
                pathname,
                query: { media: true },
            })}><PictureIcon /></div>
            <div className="p-2 hover:bg-medium cursor-pointer rounded-sm" onClick={() => router.push({
                pathname,
                query: { url: true },
            })}><LinkIcon /></div>
        </div >
    )
}

CreatePostFragment.defaultProps = {
    pathname: '/static/submit'
}

export default CreatePostFragment