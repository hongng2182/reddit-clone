import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { PageContainer, PostBox, PostBoxSkeleton, CommunityBoxSkeleton } from '@/components';
import { useMeQuery, useSearchCommunitiesLazyQuery, useSearchPostsQuery } from '@/generated/graphql';
import { ArrayOfTen, defaultCommunityIcon, tabs } from '@/lib/constants';
import { setActiveFeedTab } from '@/action';
import { useGlobalState, useJoinLeaveCommunity } from '@/hooks';

const filterTabs = ['Posts', 'Communities']

function SearchPage() {
    // React hooks
    const router = useRouter();
    const { q } = router.query;
    const { dispatch } = useGlobalState()
    const [active, setActive] = useState(filterTabs[0])

    // GraphQL
    const { data: meData } = useMeQuery()
    const { data, loading: postsLoading } = useSearchPostsQuery({ variables: { keyword: q as string } })
    const [searchCommunity, { data: communitiesData, loading: communitiesLoading }] = useSearchCommunitiesLazyQuery()

    // Custom hooks
    const { handleJoinLeave } = useJoinLeaveCommunity({ keyword: q as string })

    // Use Effect hooks
    useEffect(() => {
        dispatch(setActiveFeedTab(tabs.search))
    }, [])

    // Query communitites again if user current in tab community and search for another keyword
    useEffect(() => {
        if (active === "Communities") {
            searchCommunity({ variables: { keyword: q as string } })
        }
    }, [q, active, searchCommunity])

    return <PageContainer>
        <div className='flex-start-10 mt-[25px] mb-[10px]'>
            {filterTabs.map(tab => <button
                type="button"
                className={`font-bold px-4 py-2 hover:bg-light rounded-full cursor-pointer ${active === tab ? 'bg-light ' : ''}`}
                onClick={() => {
                    setActive(tab)
                    if (tab === 'Communities') {
                        searchCommunity({ variables: { keyword: q as string } })
                    }
                }
                }>{tab}
            </button>)
            }
        </div>
        <div className='w-full'>
            {postsLoading && active === "Posts" && ArrayOfTen.map(item => <PostBoxSkeleton key={item} isSearchPost />)}
            {/* Posts tab */}
            {active === "Posts" && data?.searchPosts?.posts?.map(post => <PostBox post={post}
                hideJoinBtn
                isSearchPost
            />)}
            {active === "Posts" && data?.searchPosts?.totalCount === 0 && <p className='pl-4'>No posts found.</p>}

            {/* Communities tab */}
            {active === "Communities" && communitiesLoading && ArrayOfTen.map(item => <CommunityBoxSkeleton key={item} />)}
            {active === "Communities" && communitiesData?.searchCommunities?.totalCount === 0 && <p className='pl-4'>No communities found.</p>}
            {active === "Communities" && (communitiesData?.searchCommunities?.totalCount ?? 0) > 0 &&
                <div className='flex-col-start'>
                    {communitiesData?.searchCommunities?.communities?.map(community => <Link
                        href={`/r/${community.name}`}
                        key={community.id}
                        className='white-gray-rounded flex-between cursor-pointer w-full p-2'>
                        <div className='flex-start-10'>
                            <Image
                                alt='img'
                                width='0'
                                height='0'
                                sizes='50%'
                                src={community.communityIconUrl || defaultCommunityIcon}
                                className='img-40'
                            />
                            <div className='text-sm'>
                                <p className='font-bold'>r/{community.name} <span className='text-gray font-light text-xs'>• {community.numMembers} members</span></p>
                                <p className='text-gray text-xs'>{community.description?.slice(0, 250)}</p>
                            </div>
                        </div>
                        <button
                            className={`${community.hasJoined ? 'button-main-outline after:content-["Joined"] hover:after:content-["Leave"]' : 'button-main'} cursor-pointer`} type='button'
                            onClick={
                                (e) => {
                                    e.preventDefault();
                                    e.stopPropagation()
                                    handleJoinLeave(community.name, community.hasJoined, meData?.me?.id)
                                }}
                        >{community.hasJoined ? '' : 'Join'}</button>
                    </Link>)}
                </div>}
        </div>
    </PageContainer>
}

export default SearchPage