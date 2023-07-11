import React from 'react'
import { NetworkStatus } from "@apollo/client"
import { useRouter } from 'next/router'
import { CreatePostFragment, PageContentLayout, PageContainer, FilterBox, PostBox, CommunityBanner, AboutCommunity } from '@/components'
import { useCommunityQuery, useGetCommunityPostsQuery, useMeQuery } from '@/generated/graphql'
import { FETCH_LIMIT } from '@/types'

function CommunityPage() {
    const router = useRouter()
    const communityName = router.query.community as string
    const { data: communityData } = useCommunityQuery({ variables: { communityName } })
    const { data, fetchMore, networkStatus } = useGetCommunityPostsQuery({ variables: { communityName, first: FETCH_LIMIT, after: null }, notifyOnNetworkStatusChange: true })
    const isLoadingMorePosts = networkStatus === NetworkStatus.fetchMore

    const { data: meData } = useMeQuery()

    // userId(meQuery) === communityCreator => Mod Tools show
    if (!communityData?.community) {
        return "Sorry, there aren’t any communities on Reddit with that name."
    }
    return (
        <>
            <CommunityBanner userId={meData?.me?.id} communityInfo={communityData.community} />
            {data?.getCommunityPosts && <PageContainer>
                <PageContentLayout
                    left={<>
                        <CreatePostFragment pathname={`${router.asPath}/submit`} />
                        <FilterBox />
                        <div className='flex-col-start-10 w-full'>
                            {data?.getCommunityPosts.paginatedPosts.length > 0 ? data?.getCommunityPosts.paginatedPosts.map(post => <PostBox key={post.id} post={post} hideCommunity hideJoinBtn />) : 'No posts in this community'}
                            {
                                data?.getCommunityPosts.pageInfo.hasNextPage &&
                                <button
                                    type="button"
                                    className='button-main'
                                    onClick={() => fetchMore({ variables: { first: FETCH_LIMIT, after: data?.getCommunityPosts.pageInfo.endCursor } })}>
                                    {isLoadingMorePosts ? 'Loading' : 'Load more'}
                                </button>
                            }
                        </div>
                    </>}
                    right={<AboutCommunity
                        isMod={meData && communityData.community.creatorId === meData.me?.id}
                        communityInfo={communityData.community} />}
                />
            </PageContainer>}
        </>
    )
}

export default CommunityPage