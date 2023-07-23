import React, { useRef } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import Link from 'next/link'
import { defaultCommunityIcon, defaultProfileIcon } from '@/lib/constants'
import { getTimeString } from '@/utils'
import { MeDocument, MeQuery, UserCommonInfoDocument, useUpdateUserProfileMutation } from '@/generated/graphql'
import { useUploadImage } from '@/hooks'
import { CalendarIcon, ImageEditIcon, SpinnerIcon } from '../icons'

type Props = {
    userInfo: {
        user: { __typename?: 'PartialUser', username: string, profileUrl?: string | null, createdAt: string },
        moderators: Array<{ __typename?: 'Community', numMembers: number, communityIconUrl?: string | null, name: string }>
    },
    meData: MeQuery | undefined
}

function UserInfo({ userInfo, meData }: Props) {
    const { user: { username, profileUrl, createdAt }, moderators } = userInfo
    const dateCreated = getTimeString(createdAt)
    const isProfileOwner = meData?.me?.username === username
    const [updateProfileUrl] = useUpdateUserProfileMutation({
        update(cache, { data }) {
            const newProfileUrl = data?.updateUserProfile.user?.profileUrl
            if (newProfileUrl) {
                cache.updateQuery({
                    query: MeDocument,
                }, (cacheData) => ({
                    me: {
                        ...cacheData.me,
                        profileUrl: newProfileUrl
                    }
                }))
                cache.updateQuery({
                    query: UserCommonInfoDocument,
                    variables: { userName: username }
                }, (cacheData) => ({
                    userCommonInfo: {
                        ...cacheData.userCommonInfo,
                        user: {
                            ...cacheData.userCommonInfo.user,
                            profileUrl: newProfileUrl
                        }
                    }
                }))
            }
        }
    })
    const inputFileRef = useRef<HTMLInputElement>(null)
    const handleOpenFile = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click()
        }
    }
    // Image Upload hooks
    const onUploadComplete = async (downloadURL: string) => {
        const response = await updateProfileUrl({ variables: { profileUrl: downloadURL } })
        if (response.data?.updateUserProfile.user) {
            toast.success("Successfully updated profile!")
        }
        if (response.data?.updateUserProfile.errors) {
            toast.error(response.data?.updateUserProfile.errors[0].message)
        }
    }
    const { isUploading, handleFileInput } = useUploadImage({
        onUploadComplete,
        firebaseFolderName: 'user-profile',
        oldImageUrl: profileUrl as string
    })

    return (<>
        <div className='w-full mb-3 white-gray-rounded'>
            {/* Title */}
            <div className='flex-between bg-primary text-white font-bold p-2 h-[100px]' />
            {/* CommunityIcon show in submit page */}
            <div className="relative px-3">
                <Image
                    alt='profile-icon'
                    width='80'
                    height='80'
                    sizes='100%'
                    src={profileUrl || defaultProfileIcon}
                    className={`img-80 border-[4px] border-medium absolute top-[-60px] bg-white ${isUploading && 'opacity-30'}`}
                />
                {isUploading && <p className='absolute top-[-60px]'><SpinnerIcon /></p>}
                {isProfileOwner && <div className="absolute rounded-full left-[74px] top-[-5px] w-[36px] h-[36px] border border-cate-blue flex-center bg-white cursor-pointer"
                    onClick={handleOpenFile}
                >
                    <ImageEditIcon />
                    <input
                        className='hidden'
                        type="file"
                        accept="image/*"
                        ref={inputFileRef}
                        onChange={handleFileInput}
                    />
                </div>}
                <p className='text-base font-bold pt-[25px]'>u/{username}</p>
            </div>

            {/* Community Info */}
            <div className='p-3 flex-col-start-10 mx-auto w-[90%]'>
                <div className='flex-col-center-10 w-full'>
                    <p className='font-bold'>Cake day</p>
                    <div className='flex-start-10 text-gray'><CalendarIcon /> {dateCreated}</div>
                </div>

                {/* Create Post Button */}
                {isProfileOwner && <Link href="/static/submit"
                    className='button-main text-center w-full mt-2 mb-4'
                >New Post</Link>}
            </div>
        </div>
        {moderators.length > 0 && <div className='w-full mb-3 white-gray-rounded p-3'>
            {/* Title */}
            <h3>{isProfileOwner ? "You're a moderator of these communitites" :
                "Moderator of these communities"}</h3>
            {/* Community Info */}
            {moderators.map(community => <div key={community.name} className='pt-3 flex-col-start-10 mx-auto w-[90%]'>
                <div className='flex-between w-full'>
                    <div className='flex-start-10'>
                        <Image
                            alt='img'
                            width='0'
                            height='0'
                            sizes='50%'
                            src={community.communityIconUrl || defaultCommunityIcon}
                            className='img-40'
                        />
                        <div className='text-sm flex flex-col'>
                            <Link href={`/static/r/${community.name}`} className='font-bold cursor-pointer hover:underline'>r/{community.name}</Link>
                            <p className='text-gray font-light text-xs'>{community.numMembers} members</p>
                        </div>
                    </div>
                    <button
                        className="button-main-outline" type='button' disabled
                    >Joined</button>
                </div>
            </div>)}
        </div>}
    </>
    )
}

export default UserInfo