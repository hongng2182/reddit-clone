import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { PageContainer, PageContentLayout, ProfileNav, UserInfo } from '@/components'
import { useGetUserCommentsQuery, useMeQuery, useUserCommonInfoQuery } from '@/generated/graphql'
import { useGlobalState } from '@/hooks'
import { setActiveFeedTab } from '@/action'
import { defaultProfileIcon } from '@/lib/constants'
import { CommentIcon } from '@/components/icons'

type CommentInfo = { __typename?: 'Comment', id: number, message: string, createdAt: string, post: { __typename?: 'Post', title: string, id: number, user: { __typename?: 'User', username: string }, community: { __typename?: 'Community', name: string } }, user: { __typename?: 'User', username: string } }

const DynamicTimeAgo = dynamic(() => import('@/components/static/time-ago'), { ssr: false })


function UserPage() {
    const router = useRouter()
    const { username } = router.query
    const { data: meData } = useMeQuery()
    const { data: userComments } = useGetUserCommentsQuery({ variables: { username: username as string } })
    const { data: userCommonInfo } = useUserCommonInfoQuery({ variables: { userName: username as string } })
    const { dispatch } = useGlobalState()

    useEffect(() => {
        dispatch(setActiveFeedTab({
            name: `u/${username as string}`,
            icon: userCommonInfo?.userCommonInfo.user.profileUrl ? userCommonInfo?.userCommonInfo.user.profileUrl : defaultProfileIcon,
            iconFill: null
        }))
    }, [username, userCommonInfo?.userCommonInfo.user.profileUrl, dispatch])

    const groupedComments: { [key: number | string]: CommentInfo[] } = {};
    userComments?.getUserComments?.comments?.forEach(comment => {
        const postId = comment.post.id;
        if (!groupedComments[postId]) {
            groupedComments[postId] = [];
        }
        groupedComments[postId].push(comment);
    });


    return (
        <>
            <ProfileNav activeTab="COMMENTS" username={username as string} meData={meData} />
            <PageContainer>
                <PageContentLayout
                    containerClassname='mt-[40px]'
                    left={Object.keys(groupedComments).length > 0 ?
                        <div className='flex-col-start-10'>
                            {Object.keys(groupedComments).map((postId) => {
                                const { post } = groupedComments[postId][0]
                                return (
                                    <div key={postId} className='w-full'>
                                        <div className='white-gray-rounded hover:border-gray flex-start-10 p-2'>
                                            <CommentIcon />
                                            <div className='text-sm text-gray'>
                                                <Link href={`/static/user/${username}`} className='text-cate-blue hover:underline'> {username} </Link>commented on <Link href={`/static/r/${post.community.name}/comments/${post.id}`} className='text-base font-bold cursor-pointer'>{post.title} </Link>
                                                · <Link href={`/static/r/${post.community.name}`} className='hover:underline label-md'> r/{post.community.name} </Link>
                                                · Posted by <Link href={`/static/user/${post.user.username}`} className='hover:underline'> u/{post.user.username} </Link>
                                            </div>
                                        </div>
                                        {groupedComments[postId].map(comment => {
                                            const { id: commentId, post: { id, community: { name: communityName } }, message, createdAt, user: { username: commentOwner } } = comment
                                            return <div key={id} className='white-gray-rounded hover:border-gray' onClick={() => router.push(`/static/r/${communityName}/comments/${id}?context=${commentId}`)}>
                                                <div className='flex-col-start pl-[30px] py-2'>
                                                    <div>
                                                        <span className='username'>{commentOwner} ·</span>
                                                        <span className='text-gray text-xs'><DynamicTimeAgo time={createdAt} />
                                                        </span>
                                                    </div>
                                                    <p>{message}</p>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                )
                            })}
                        </div> :
                        <div className='text-center'>No comments found.</div>
                    }
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