import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { CommunityInfo, PrivacyType } from '@/types'
import { defaultCommunityIcon } from '@/lib/constants'
import { getTimeString } from '@/utils'
import { useUpdateCommunityMutation } from '@/generated/graphql'
import { CalendarIcon, EditIcon, LockIcon, ProfileIcon, RestrictedIcon, ShieldIcon } from './icons'

type Props = {
    communityInfo: CommunityInfo,
    isSubmitPost?: boolean
    isMod: boolean | undefined,
    isUserLogin: boolean
}

function AboutCommunity({ communityInfo, isSubmitPost, isMod, isUserLogin }: Props) {
    // Props destructure
    const { id, numMembers, createdAt, description, communityIconUrl, name, privacyType } = communityInfo

    // React hooks
    const router = useRouter()
    const [showEdit, setShowEdit] = useState(false)
    const [descriptionInput, setDescriptionInput] = useState(description || '')
    const descriptionRef = useRef<HTMLSpanElement>(null)

    // GraphQL hooks
    const [updateCommunity] = useUpdateCommunityMutation()

    // Utils
    const remainCharacters = 500 - descriptionInput.length
    const dateCreated = getTimeString(createdAt)

    const handleEditDescription = async () => {
        if (descriptionInput !== '' && descriptionInput !== description) {
            const response = await updateCommunity({
                variables: {
                    updateCommunityId: id,
                    input: { description: descriptionInput }
                }
            })
            const communityData = response.data?.updateCommunity.community
            if (communityData) {
                toast.success("Community settings updated successfully")
                setShowEdit(false)
                if (communityData.description) {
                    setDescriptionInput(communityData.description)
                }
            }
        } else {
            toast("Please make sure you have entered updated info!", {
                icon: '🤔',
                style: { color: '#363938', backgroundColor: '#f5fafc' }
            })
        }
    }

    return (
        <div className='w-full mb-3 white-gray-rounded'>
            {/* Title */}
            <div className='flex-between bg-cate-blue text-white font-bold p-2'>
                <p className='w-full'>About Community</p>
                {isMod &&
                    <Link href={`/r/${name}/mod`} className='flex-start w-1/2 hover:bg-[#277fc3] hover:rounded-md cursor-pointer'>
                        <ShieldIcon />
                        <span className='text-[12px]'>MOD TOOLS</span>
                    </Link>}
            </div>
            {/* CommunityIcon show in submit page */}
            {isSubmitPost && <div className="flex-start-10 px-3 pt-3">
                <Image
                    alt='community-icon'
                    width='0'
                    height='0'
                    sizes='100%'
                    src={communityIconUrl || defaultCommunityIcon}
                    className='img-40 border border-medium'
                />
                <span className='text-base font-bold'>r/{name}</span>
            </div>}

            {/* Community Info */}
            <div className='pt-3 flex-col-start-10 mx-auto w-[90%]'>
                {/* Description for normal user */}
                {!isMod && <p style={{ wordBreak: 'break-word' }}>{description}</p>}

                {/* Description MOD with edit */}
                {isMod && <div className={`flex-start-10 border border-transparent cursor-pointer w-full ${!showEdit && 'hover:border-primary'}`}
                    onClick={() => !showEdit && setShowEdit(true)}>
                    {/* Description & Icon */}
                    {!showEdit && <div className='items-center p-2'>
                        <span ref={descriptionRef}>{description || 'Edit Community Description'}</span>
                        <EditIcon fill='#39B5E0' width={20} className='inline-block ml-2' />
                    </div>}
                    {/* Edit textarea */}
                    {showEdit && <div className='flex-col-start gap-[5px] w-full border border-primary h-full rounded-md bg-light pb-3'>
                        <textarea
                            style={{ height: `calc(${descriptionRef.current?.getBoundingClientRect().height}px + 20px)` }}
                            maxLength={500}
                            className='overflow-hidden break-words p-2 w-full resize-none focus:outline-none bg-light'
                            value={descriptionInput} onChange={(e) => setDescriptionInput(e.target.value)} />
                        <div className="flex-between">
                            {/* Character remmaining */}
                            <p className={`text-[12px] font-light pl-2 ${remainCharacters > 0 ? 'text-gray' : 'text-error'}`}>{remainCharacters} Characters remaining</p>
                            {/* Edit & Cancel buttons */}
                            <div className='flex-end gap-[10px] pr-2 text-sm font-bold'>
                                <button type="button" className='text-error' onClick={() => {
                                    setShowEdit(false)
                                    setDescriptionInput(description || '')
                                }}>Cancel</button>
                                <button type="button" className='text-cate-blue'
                                    onClick={handleEditDescription}>Edit</button>
                            </div>
                        </div>
                    </div>}
                </div>}

                {/* Created Day */}
                <div className='flex-start-10 text-gray'>
                    <CalendarIcon />
                    Created {dateCreated}
                </div>

                {/* Privacy type show for MOD */}
                {isMod && <div className='flex-start-10 text-gray'>
                    {privacyType === PrivacyType.public && <ProfileIcon type='fill' />}
                    {privacyType === PrivacyType.restricted && <RestrictedIcon />}
                    {privacyType === PrivacyType.private && <LockIcon />}
                    {privacyType[0].toUpperCase() + privacyType.slice(1,)}
                </div>}

                {/* Num of members */}
                <div className='h-[1px] w-full bg-medium' />
                <div className='flex-col-center-10 w-full'>
                    <p>{numMembers}</p>
                    <p>Members</p>
                </div>
                <div className='h-[1px] w-full bg-medium' />

                {/* Create Post Button */}
                {!isSubmitPost && isUserLogin && <button type="button"
                    className='button-main w-full mt-2 mb-4'
                    onClick={() => router.push(`${router.asPath}/submit`)}
                >Create Post</button>}
            </div>
        </div>
    )
}

AboutCommunity.defaultProps = {
    isSubmitPost: false
}

export default AboutCommunity