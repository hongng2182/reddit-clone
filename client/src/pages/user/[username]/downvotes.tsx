import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { PageContainer, PageContentLayout, PostBox, PostBoxSkeleton, ProfileNav, UserInfo, UserInfoSkeleton } from '@/components'
import { useGetDownvotePostsQuery, useMeQuery, useUserCommonInfoQuery } from '@/generated/graphql'
import { useGlobalState } from '@/hooks'
import { setActiveFeedTab } from '@/action'
import { ArrayOfThree, defaultProfileIcon } from '@/lib/constants'

function UserPage() {
    const router = useRouter()
    const { username } = router.query
    const { data: meData } = useMeQuery()
    const { data: userPosts, loading: userPostsLoading } = useGetDownvotePostsQuery({ variables: { username: username as string } })
    const { data: userCommonInfo, loading: userInfoLoading } = useUserCommonInfoQuery({ variables: { userName: username as string } })
    const { dispatch } = useGlobalState()

    useEffect(() => {
        dispatch(setActiveFeedTab({
            name: `u/${username as string}`,
            icon: userCommonInfo?.userCommonInfo.user.profileUrl ? userCommonInfo?.userCommonInfo.user.profileUrl : defaultProfileIcon,
            iconFill: null
        }))
    }, [username, userCommonInfo?.userCommonInfo.user.profileUrl, dispatch])

    if (meData && meData.me?.username !== username as string) {
        return <div className='h-[80vh] min-h-[400px] flex flex-col justify-center items-center gap-[15px]'>
            <h3>You do not have permission to access this resource</h3>
            <p className='text-gray'>You can only look at your own saved posts and comments
            </p>
        </div>
    }

    return (meData && meData.me?.username === username as string &&
        <>
            <ProfileNav activeTab="DOWNVOTED" username={username as string} meData={meData} />
            <PageContainer>
                <PageContentLayout
                    containerClassname='mt-[40px]'
                    left={<>
                        {/* POSTS */}
                        <div className='flex-col-start w-full'>
                            {userPosts?.getDownvotePosts?.posts?.map(post => <PostBox key={post.id} post={post} />)}
                            {userPosts?.getDownvotePosts?.posts?.length === 0 && 'No posts found.'}
                            {userPostsLoading && ArrayOfThree.map(item => <PostBoxSkeleton key={item} />)}
                        </div>
                    </>}
                    right={<>{userInfoLoading && <UserInfoSkeleton />}
                        {userCommonInfo?.userCommonInfo && <UserInfo
                            meData={meData}
                            userInfo={{
                                user: userCommonInfo?.userCommonInfo.user,
                                moderators: userCommonInfo?.userCommonInfo.moderators
                            }} />}
                    </>} />
            </PageContainer>
        </>
    )
}

export default UserPage