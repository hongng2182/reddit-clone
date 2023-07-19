/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Error, ImageUpload, PageContainer } from '@/components'
import { CommunityDocument, CommunityUpdateInput, MeDocument, useCommunityQuery, useMeQuery, useUpdateCommunityMutation } from '@/generated/graphql'
import { addApolloState, initializeApollo } from '@/lib/apolloClient'
import { defaultCommunityIcon } from '@/lib/constants'
import { PrivacyType } from '@/types'
import { LockIcon, ProfileIcon, RestrictedIcon } from '@/components/icons'
import { useSetActiveFeed, useUploadImage } from '@/hooks'


const MAX_DISPLAYNAME_CHARACTERS = 100
const MAX_DESCRIPTION_CHARACTERS = 500

function ModPage({ isError: isErrorFromServer }: { isError: boolean }) {
    // TODO: textarea expand
    // React hooks 
    const router = useRouter()
    const communityName = router.query.community as string

    // GraphQL hooks 
    const { data: meData } = useMeQuery()
    const { data: communityData } = useCommunityQuery({ variables: { communityName } })
    const [updateCommunity] = useUpdateCommunityMutation()
    useSetActiveFeed({ communityData })

    // Form state
    const [displayName, setDisplayName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [privacyType, setPrivacyType] = useState<string>('')
    const [communityIconUrl, setcommunityIconUrl] = useState<string>('')

    // useEffect to set default value for form  value after 1st render
    useEffect(() => {
        if (communityData?.community) {
            setDisplayName(communityData?.community?.displayName)
            setDescription(communityData?.community?.description || '')
            setPrivacyType(communityData?.community?.privacyType)
        }
    }, [communityData?.community])

    // Image Upload hooks
    const onUploadComplete = (downloadURL: string) => {
        setcommunityIconUrl(downloadURL)
    }
    const { isUploading, photoFile, deleteImage, handleFileInput, deleteFirebaseImage, setPhotoFile } = useUploadImage({
        onUploadComplete,
        firebaseFolderName: 'community-icon'
    })

    const memoizedImage = useMemo(() => {
        const onDeleteImage = () => {
            deleteImage()
            setcommunityIconUrl('')
        }
        return (
            <ImageUpload
                photoFile={photoFile}
                handleFileInput={handleFileInput}
                isUploading={isUploading}
                onDeleteImage={onDeleteImage}
            />
        )
    }, [photoFile, handleFileInput, isUploading]);

    // Utils
    const remainNameCharacters = MAX_DISPLAYNAME_CHARACTERS - displayName.length
    const remainDescCharacters = MAX_DESCRIPTION_CHARACTERS - description.length

    if (isErrorFromServer) {
        return <Error />
    }

    if (!meData?.me || meData.me.id !== communityData?.community?.creatorId) {
        return <UserNotAllowed communityName={communityData?.community?.name} />
    }

    const handleSaveChanges = async () => {
        // Check field empty and had changed compare to initial communityData then send update request
        let form: CommunityUpdateInput = {}
        const initialForm = communityData?.community
        if (initialForm) {
            if (displayName !== '' && displayName !== initialForm.displayName) {
                form = { ...form, displayName }
            }
            if (description !== '' && description !== initialForm.description) {
                form = { ...form, description }
            }
            if (communityIconUrl !== '' && communityIconUrl !== initialForm.communityIconUrl) {
                form = { ...form, communityIconUrl }
            }
            if (privacyType !== '' && privacyType !== initialForm.privacyType) {
                form = { ...form, privacyType }
            }
            // Check if any field has been appended to form
            if (Object.keys(form).length > 0
            ) {
                // Start sending request to update community info
                const response = await updateCommunity({ variables: { input: form, updateCommunityId: initialForm.id } })

                if (response.data?.updateCommunity.community)
                    // If success, find and delete old image record in Firebase(if has)
                    toast.success('Successfuly save your community settings!')
                setPhotoFile(null)
                try {
                    const { communityIconUrl: oldCommunityIconUrl } = initialForm
                    if (oldCommunityIconUrl && form.communityIconUrl) {
                        deleteFirebaseImage(oldCommunityIconUrl)
                    }
                } catch (deletePhotoError) {
                    console.log(deletePhotoError)
                }
            }
        }

    }

    return (communityData?.community && <>
        {/* Community Banner */}
        <div className='banner h-[250px]'>
            <div className='h-[150px] bg-primary' />
            <div className='h-[90px] bg-white'>
                <div className='main-container relative bg-slate-400'>
                    <Link href={`/static/r/${communityData?.community.name}`} className="absolute  top-[-16px] left-0  flex-start-10 cursor-pointer" >
                        <div className='w-[80px] h-[80px] rounded-full bg-medium border-4 border-white'>
                            <Image
                                height='0'
                                width='0'
                                src={communityData?.community.communityIconUrl || defaultCommunityIcon}
                                alt='logo'
                                sizes='100%'
                                className='w-full h-full rounded-full'
                            />
                        </div>
                        <div className='mt-[20px] flex-col-start'>
                            <h1>{communityData?.community.displayName}</h1>
                            <span className='label-sm'>r/{communityData?.community.name}</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
        <PageContainer>
            <div className='white-gray-rounded my-[40px] p-3 flex flex-col gap-[20px]'>
                {/* Submit Button */}
                <div className='flex-between'>
                    <h2>Community settings</h2>
                    <button type='button' className='button-main'
                        onClick={handleSaveChanges}>Save changes</button>
                </div>
                {/* COMMUNITY PROFILE */}
                <div>
                    <h4 className='label-md-gray'>COMMUNITY PROFILE</h4>
                    <div className="h-[1px] w-full bg-medium mt-1" />
                    {/* Community Name */}
                    <div className="p-3">
                        <h3>Community name</h3>
                        <div className='border border-medium rounded-sm focus:border-black w-full h-[40px] pl-2 mt-3'>
                            <input
                                maxLength={100}
                                name="name"
                                type="text"
                                className='w-full h-full pr-2'
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            /></div>
                        <p className={`text-sm font-light ${remainNameCharacters > 0 ? 'text-gray' : 'text-error'}`}>{remainNameCharacters} Characters remaining</p>
                    </div>
                    {/* Community Description */}
                    <div className="p-3">
                        <h3>Community description</h3>
                        <p className='text-[0.9rem] text-gray'>This is how new members come to understand your community.</p>
                        <textarea
                            rows={4}
                            maxLength={500}
                            className='overflow-hidden break-words p-2 w-full focus:outline-none border border-medium rounded-sm pl-2 mt-3'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                        <p className={`text-sm font-light ${remainDescCharacters > 0 ? 'text-gray' : 'text-error'}`}>{remainDescCharacters} Characters remaining</p>
                    </div>
                </div>

                {/* COMMUNITY TYPE */}
                <div>
                    <h4 className='label-md-gray'>COMMUNITY TYPE</h4>
                    <div className="h-[1px] w-full bg-medium mt-1" />
                    <div className='flex flex-col gap-[8px] p-3'>
                        <div className='flex-start gap-[5px]'>
                            {/* Public */}
                            <input type="radio" name="privacyType" id="public"
                                onChange={(e) => setPrivacyType(e.target.value)} value={PrivacyType.public}
                                checked={privacyType === PrivacyType.public} />
                            <span className='w-[24px]'><ProfileIcon type='fill' /></span>
                            <label htmlFor="public" className='label-md'>Public</label>
                            <span className="label-sm font-light"> Anyone can view, post, and comment to this community</span>
                        </div>
                        {/* Restricted */}
                        <div className='flex-start gap-[5px]'>
                            <input type="radio" name="privacyType" id="restricted"
                                value={PrivacyType.restricted} onChange={(e) => setPrivacyType(e.target.value)}
                                checked={privacyType === PrivacyType.restricted} />
                            <span className='w-[24px]'><RestrictedIcon /></span>
                            <label htmlFor="restricted" className='label-md'>Restricted</label>
                            <span className="label-sm font-light"> Anyone can view this community, but only approved users can post</span>
                        </div>
                        {/* Privacy */}
                        <div className='flex-start gap-[5px]'>
                            <input type="radio" value={PrivacyType.private} name="privacyType" id="private" onChange={(e) => setPrivacyType(e.target.value)}
                                checked={privacyType === PrivacyType.private} />
                            <span className='w-[24px]'><LockIcon /></span>
                            <label id="public" className='label-md'>Private</label>
                            <span className="label-sm font-light">Only approved users can view and submit to this community</span>
                        </div>
                    </div>
                </div>

                {/* COMMUNITY ICON */}
                <div>
                    <h4 className='label-md-gray'>COMMUNITY ICON</h4>
                    <div className="h-[1px] w-full bg-medium mt-1" />
                    <div className='m-[15px]'>
                        {memoizedImage}
                    </div>
                </div>
            </div>
        </PageContainer>
    </>
    )
}

export default ModPage


function UserNotAllowed({ communityName }: { communityName: string | undefined }) {
    return <div className='h-[80vh] min-h-[400px] flex flex-col justify-center items-center gap-[15px]'>
        <Image
            width='250'
            height='0'
            alt='avatar'
            sizes='50%'
            src='/remember-the-human.png'
            className=''
        />
        <h3>Sorry, this is a moderator-only page.</h3>
        {communityName && <p className='text-gray'>You must be a moderator of r/{communityName} to view this page
        </p>}
    </div>
}


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { params } = context

    if (!params) return {
        props: {
            isError: true,
        },
    }

    const communityName = params.community as string

    if (!communityName) return {
        props: {
            isError: true,
        },
    }

    try {
        const apolloClient = initializeApollo({ headers: context.req.headers })
        await apolloClient.query({
            query: MeDocument,
        })

        await apolloClient.query({
            query: CommunityDocument,
            variables: { communityName }
        })

        return addApolloState(apolloClient, {
            props: {}
        })
    } catch (error) {
        return {
            props: {
                isError: true,
            },
        }
    }
}