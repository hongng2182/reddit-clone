import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { PageContainer, PageContentLayout, PostBox, PostBoxSkeleton, ProfileNav, UserInfo, UserInfoSkeleton } from '@/components'
import { useGetUserPostsQuery, useMeQuery, useUserCommonInfoQuery } from '@/generated/graphql'
import { useGlobalState } from '@/hooks'
import { setActiveFeedTab } from '@/action'
import { ArrayOfThree, defaultProfileIcon } from '@/lib/constants'

function UserPage() {
    const router = useRouter()
    const { username } = router.query
    const { data: meData, loading: meLoading } = useMeQuery()
    const { data: userPosts, loading: userPostsLoading } = useGetUserPostsQuery({ variables: { username: username as string } })
    const { data: userCommonInfo, loading: userInfoLoading } = useUserCommonInfoQuery({ variables: { userName: username as string } })
    const { dispatch } = useGlobalState()

    useEffect(() => {
        dispatch(setActiveFeedTab({
            name: `u/${username as string}`,
            icon: userCommonInfo?.userCommonInfo.user?.profileUrl ? userCommonInfo?.userCommonInfo.user.profileUrl : defaultProfileIcon,
            iconFill: null
        }))
    }, [username, userCommonInfo?.userCommonInfo?.user?.profileUrl, dispatch])

    if (userCommonInfo?.userCommonInfo.errors === "No user found with this name!") {
        return <div className='h-[80vh] min-h-[400px] flex flex-col justify-center items-center gap-[15px]'>
            <h3>Sorry, nobody on MiniReddit goes by that name</h3>
            <p className='text-gray'>The person may have been banned or the username is incorrect.
            </p>
            <Link href="/" className="button-main">Go gome</Link>
        </div>
    }

    return (
        <>
            {meLoading && <div className='h-[42px] border-t border-medium bg-white' />}
            {meData?.me && <ProfileNav activeTab="POSTS" username={username as string} meData={meData.me} />}
            <PageContainer>
                <PageContentLayout
                    containerClassname='mt-[40px]'
                    left={<div className='flex-col-start w-full'>
                        {userPosts?.getUserPosts?.posts?.map(post => <PostBox key={post.id} post={post} />)}
                        {userPosts?.getUserPosts?.posts?.length === 0 && 'No posts found.'}
                        {userPostsLoading && ArrayOfThree.map(item => <PostBoxSkeleton key={item} />)}
                    </div>}
                    right={<>
                        {userInfoLoading && <UserInfoSkeleton />}
                        {userCommonInfo?.userCommonInfo.user && <UserInfo
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