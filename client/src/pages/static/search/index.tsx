import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router'
import { PageContainer, PageContentLayout, PostBox } from '@/components';
import { communities_mockup } from '@/mockup';
import { usePostsQuery } from '@/generated/graphql';

// TODO: create FE for search page
function SearchPage() {
    const router = useRouter();
    const { q } = router.query;
    const { data } = usePostsQuery({ variables: { first: 10, after: null }, notifyOnNetworkStatusChange: true })


    return <PageContainer>
        <h3 className='w-fit bg-light px-4 py-2 mt-[25px] mb-[10px] rounded-full h-[45px]'>Posts on {q}</h3>
        <PageContentLayout
            containerClassname='mt-[20px]'
            left={<div className='flex-col-start'>
                <div className='w-full'>
                    {data?.posts.paginatedPosts.map(post => <PostBox post={post}
                        hideJoinBtn
                        isTrendingPost
                    />)}
                </div>

            </div>}
            right={<div className='w-full'>
                <h3 className='pl-[20px] pt-4'>Communities</h3>
                {communities_mockup.map(community =>
                    <div className='flex-between cursor-pointer border-b border-medium pr-2'>
                        <div
                            className="w-full feed-tab flex-start-10"
                        >
                            <div className='w-[30px] h-[30px]'>
                                <Image
                                    alt='community'
                                    width='0'
                                    height='0'
                                    src={community.imgSrc}
                                    sizes='100%'
                                    className='w-[30px] rounded-full'
                                />
                            </div>
                            <div className="flex flex-col items-start text-sm">
                                <span className='font-bold'>{community.name}</span>
                                <span className='text-gray text-xs'>{community.numOfMember} members</span>
                            </div>
                        </div>
                        <button type="button" className='button-hover bg-light px-5'>Join</button>
                    </div>)}
            </div>}
        />
    </PageContainer>
}

export default SearchPage