import React from 'react'
import { NetworkStatus } from "@apollo/client"
import { useRouter } from 'next/router'
import { CreatePostFragment, PageContentLayout, PageContainer, FilterBox, PostBox, CommunityBanner, AboutCommunity, AboutCommunitySkeleton, CommunityBannerSkeleton, PostBoxSkeleton } from '@/components'
import { useCommunityQuery, useGetCommunityPostsQuery, useMeQuery } from '@/generated/graphql'
import { ArrayOfThree, FETCH_LIMIT } from "@/lib/constants"
import { LoadingIcon } from '@/components/icons'
import { useSetActiveFeed } from '@/hooks'

function CommunityPage() {
    // React hooks
    const router = useRouter()
    const communityName = router.query.community as string

    // GraphQL hooks
    const { data: meData } = useMeQuery()
    const { data: communityData, loading: communityInfoLoading } = useCommunityQuery({ variables: { communityName } })
    const { data, fetchMore, networkStatus, loading: postsLoading } = useGetCommunityPostsQuery({ variables: { communityName, first: FETCH_LIMIT, after: null }, notifyOnNetworkStatusChange: true })

    const isLoadingMorePosts = networkStatus === NetworkStatus.fetchMore
    useSetActiveFeed({ communityData: communityData?.community })
    // Hooks
    // Return no community match
    if (communityData?.community === null) {
        return <div className='h-[80vh] min-h-[400px] flex flex-col justify-center items-center gap-[15px]'>
            <h3>Sorry, there aren’t any communities on MiniReddit with that name.</h3>
        </div>
    }

    return (
        <>
            {communityInfoLoading && <CommunityBannerSkeleton />}
            {communityData?.community && <CommunityBanner userId={meData?.me?.id} communityInfo={communityData.community} />}
            <PageContainer title={communityData?.community?.displayName && communityData.community.displayName }>
                <PageContentLayout
                    left={<>
                        {meData?.me && <CreatePostFragment meData={meData} pathname={`${router.asPath}/submit`} />}
                        <FilterBox />
                        <div className='flex-col-start-10 w-full'>
                            {postsLoading && ArrayOfThree.map(item => <PostBoxSkeleton key={item} />)}

                            {data?.getCommunityPosts && data?.getCommunityPosts.paginatedPosts.length > 0 ?
                                data?.getCommunityPosts.paginatedPosts.map(post => <PostBox key={post.id} post={post} hideCommunity hideJoinBtn />)
                                : 'No posts in this community'}
                            {
                                data?.getCommunityPosts.pageInfo.hasNextPage &&
                                <button
                                    type="button"
                                    className='button-main'
                                    onClick={() => fetchMore({ variables: { first: FETCH_LIMIT, after: data?.getCommunityPosts.pageInfo.endCursor } })}>
                                    {isLoadingMorePosts ? <LoadingIcon /> : 'Load more'}
                                </button>
                            }
                        </div>
                    </>}
                    right={<>
                        {communityInfoLoading && <AboutCommunitySkeleton />}
                        {communityData?.community && <AboutCommunity
                            isUserLogin={Boolean(meData?.me)}
                            isMod={meData && communityData.community.creatorId === meData.me?.id}
                            communityInfo={communityData.community} />}
                    </>}
                />
            </PageContainer>
        </>
    )
}

export default CommunityPage