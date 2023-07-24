import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { trending_posts } from '@/mockup'

function TrendingPosts() {
    const router = useRouter()

    return (
        <div className='flex-col-10 my-3'>
            <h4 className='label-md mb-3'>Trending today</h4>
            <div className="card grid grid-cols-1 xs1:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 h-[186px] overflow-hidden cursor-pointer">
                {trending_posts.map(item => <div
                    key={item.id}
                    style={{
                        background: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(${item.imgUrl})`,
                        backgroundPosition: 'center'
                    }}
                    className="px-2 rounded-md bg-medium text-white h-[186px] pt-[80px]"
                    onClick={() => router.push(`/search?q=${item.topic}`)}>
                    <h3>{item.topic}</h3>
                    <p className='h-[36px] line-clamp-2'>{item.shortDesc}</p>
                    <div className='flex-start text-sm mt-2'>
                        <Image
                            height='0'
                            width='0'
                            src={item.communityImg}
                            alt='logo'
                            sizes='80%'
                            className='h-[16px] w-[16px] mr-1 rounded-full'
                        />
                        r/{item.community} and more</div>
                </div>)}
            </div>
        </div>
    )
}

export default TrendingPosts