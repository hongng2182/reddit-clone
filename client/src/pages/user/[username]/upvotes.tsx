import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { PageContainer, PageContentLayout, PostBox, ProfileNav, UserInfo } from '@/components'
import { useGetUpvotePostsQuery, useMeQuery, useUserCommonInfoQuery } from '@/generated/graphql'
import { useGlobalState } from '@/hooks'
import { setActiveFeedTab } from '@/action'
import { defaultProfileIcon } from '@/lib/constants'

function UserPage() {
    const router = useRouter()
    const { data: meData } = useMeQuery()
    const { username } = router.query
    const { data: userPosts } = useGetUpvotePostsQuery({ variables: { username: username as string } })
    const { data: userCommonInfo } = useUserCommonInfoQuery({ variables: { userName: username as string } })
    const { dispatch } = useGlobalState()

    useEffect(() => {
        dispatch(setActiveFeedTab({
            name: `u/${username as string}`,
            icon: userCommonInfo?.userCommonInfo.user.profileUrl ? userCommonInfo?.userCommonInfo.user.profileUrl : defaultProfileIcon,
            iconFill: null
        }))
    }, [username, userCommonInfo?.userCommonInfo.user.profileUrl, dispatch])

    return (
        <>
            <ProfileNav activeTab="UPVOTED" username={username as string} meData={meData} />
            <PageContainer>
                <PageContentLayout
                    containerClassname='mt-[40px]'
                    left={<>
                        {/* POSTS */}
                        <div className='flex-col-start w-full'>
                            {userPosts?.getUpvotePosts?.posts?.map(post => <PostBox post={post} />)}
                        </div>
                    </>}
                    right={userCommonInfo?.userCommonInfo && <UserInfo
                        meData={meData}
                        userInfo={{
                            user: userCommonInfo?.userCommonInfo.user,
                            moderators: userCommonInfo?.userCommonInfo.moderators
                        }} />} />
            </PageContainer>
        </>
    )
}

export default UserPage