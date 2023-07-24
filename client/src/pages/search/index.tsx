import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router'
import Link from 'next/link';
import toast from 'react-hot-toast';
import { PageContainer, PostBox } from '@/components';
import { useJoinCommunityMutation, useMeQuery, useSearchCommunitiesLazyQuery, useSearchPostsQuery, SearchCommunitiesDocument, UserCommunitiesDocument, useLeaveCommunityMutation } from '@/generated/graphql';
import { defaultCommunityIcon, tabs } from '@/lib/constants';
import { setActiveFeedTab, setShowSignInModal } from '@/action';
import { useGlobalState } from '@/hooks';
import { LoadingIcon } from '@/components/icons';
import { SearchCommunity } from '@/types';

const filterTabs = ['Posts', 'Communities']

function SearchPage() {
    const { dispatch } = useGlobalState()
    const [active, setActive] = useState(filterTabs[0])
    const { data: meData } = useMeQuery()
    const router = useRouter();
    const { q } = router.query;
    const { data, loading } = useSearchPostsQuery({ variables: { keyword: q as string } })
    const [joinCommunity] = useJoinCommunityMutation({
        update(cache, { data: newData }) {
            const joinedData = newData?.joinCommunity.community
            if (joinedData) {
                cache.updateQuery({
                    query: SearchCommunitiesDocument,
                    variables: { keyword: q as string }
                }, (cacheData) => (
                    {
                        searchCommunities:
                        {
                            ...cacheData.searchCommunities,
                            communities:
                                cacheData.searchCommunities.communities.map((community: SearchCommunity) => community.name === joinedData.name ? ({ ...community, hasJoined: true, numMembers: community.numMembers + 1 }) : community)
                        }
                    }
                )
                )
            }
        },
        refetchQueries: [
            { query: UserCommunitiesDocument }
        ]
    })

    const [leaveCommunity] = useLeaveCommunityMutation({
        update(cache, { data: responseData }) {
            const leaveData = responseData?.leaveCommunity.community
            if (leaveData) {
                cache.updateQuery({
                    query: SearchCommunitiesDocument,
                    variables: { keyword: q as string }
                }, (cacheData) => ({
                    searchCommunities:
                    {
                        ...cacheData.searchCommunities,
                        communities:
                            cacheData.searchCommunities.communities.map((community: SearchCommunity) => community.name === leaveData.name ? ({ ...community, hasJoined: false, numMembers: community.numMembers - 1 }) : community)
                    }
                }))
            }
        },
        refetchQueries: [
            { query: UserCommunitiesDocument }
        ]
    })

    const [searchCommunity, { data: communitiesData, loading: communitiesLoading }] = useSearchCommunitiesLazyQuery()

    useEffect(() => {
        dispatch(setActiveFeedTab(tabs.search))
    }, [])

    // Query communitites again if user current in tab community and search for another keyword
    useEffect(() => {
        if (active === "Communities") {
            searchCommunity({ variables: { keyword: q as string } })
        }
    }, [q, active, searchCommunity])

    const handleJoinLeave = async (communityName: string, hasJoined: boolean) => {
        if (!meData?.me) {
            dispatch(setShowSignInModal(true))
            return
        }
        if (hasJoined) {
            const response = await leaveCommunity({
                variables: { communityName }
            })
            if (response.data?.leaveCommunity.community) {
                toast.success(`Successfully leave r/${communityName}`, { position: 'bottom-center' })
            }
            if (response.data?.leaveCommunity.errors) {
                toast.error(response.data?.leaveCommunity.errors, { position: 'bottom-center' })
            }
        } else {
            const response = await joinCommunity({ variables: { communityName } })
            if (response.data?.joinCommunity.community) {
                toast.success(`Successfully join r/${communityName}`, { position: 'bottom-center' })
            }
            if (response.data?.joinCommunity.errors) {
                toast.error(response.data?.joinCommunity.errors, { position: 'bottom-center' })
            }
        }
    }


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
            {loading || communitiesLoading && <LoadingIcon />}
            {/* Posts tab */}
            {active === "Posts" && data?.searchPosts?.posts?.map(post => <PostBox post={post}
                hideJoinBtn
                isSearchPost
            />)}
            {active === "Posts" && data?.searchPosts?.totalCount === 0 && <p className='pl-4'>No posts found.</p>}

            {/* Communities tab */}
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
                                    handleJoinLeave(community.name, community.hasJoined)
                                }}
                        >{community.hasJoined ? '' : 'Join'}</button>
                    </Link>)}
                </div>}
        </div>
    </PageContainer>
}

export default SearchPage