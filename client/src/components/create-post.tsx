import React, { useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { PostInput, useCreatePostMutation } from '@/generated/graphql'
import { useUploadImage } from '@/hooks'
import { CommunityInfo } from '@/types'
import CommunitySelect from './community-select'
import ImageUpload from './image-upload'
import { LoadingIcon } from './icons'

type Tabs = {
    name: 'Post' | 'Image' | 'Link', icon: string
}
const tabs: Tabs[] = [{
    name: 'Post',
    icon: 'post',
},
{
    name: 'Image',
    icon: 'image',
}, {
    name: 'Link',
    icon: 'link',
}]

const getActiveTab = (media: string | string[] | undefined, url: string | string[] | undefined) => {
    if (media && media === 'true') { return 'Image' }
    if (url && url === 'true') { return 'Link' }
    return 'Post'
}

// eslint-disable-next-line react/require-default-props
function CreatePost({ communityInfo }: { communityInfo?: CommunityInfo }) {
    // React hooks
    const router = useRouter();
    const { media, url } = router.query;
    // Tabs state
    const [active, setActive] = useState<'Post' | 'Image' | 'Link'>(getActiveTab(media, url))

    // Form state
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [urlLink, setUrlLink] = useState('')
    const communityIdRef = useRef(0)
    const onSelectCommunity = (value: number) => {
        communityIdRef.current = value;
    };

    // Image Upload hooks
    const onUploadComplete = (downloadURL: string) => {
        setImageUrl(downloadURL)
    }
    const { isUploading, photoFile, deleteImage, handleFileInput } = useUploadImage({
        onUploadComplete,
        firebaseFolderName: 'post-image'
    })

    const memoizedImage = useMemo(() => {
        const onDeleteImage = () => {
            deleteImage()
            setImageUrl('')
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

    // GraphQL hooks
    const [createPost, { loading, error }] = useCreatePostMutation()

    // Utils
    if (error) {
        toast.error("Error when creating your post!")
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (communityIdRef.current === 0) {
            toast.error("You must choose a community!")
            return
        }
        let form: PostInput = { title, communityId: communityIdRef.current }
        if (title === '') {
            toast.error("Title cant't be empty")
            return
        }
        if (text === '' && imageUrl === '' && urlLink === '') {
            toast.error("Your post must have either post content, an image or a link")
            return
        }
        if (text !== '') { form = { ...form, text } }
        if (imageUrl !== '') { form = { ...form, imageUrl } }
        if (urlLink !== '') { form = { ...form, urlLink } }

        try {
            const response = await createPost({
                variables: { input: form }
            })
            const postData = response.data?.createPost.post
            if (postData) {
                toast.success('Successfully create a new post!')
                router.push(`/r/${postData.community.name}/comments/${postData.id}`)
            }
        } catch (err) {
            toast.error('Sorry, something went wrong when creating your post!')
            console.log(err)
        }
    }

    return (
        <div className='mb-5 w-full flex-col-start-10'>
            <h2>Create a post</h2>
            <div className="h-[1px] w-full bg-white" />
            <form className='w-full' autoComplete='off' onSubmit={(e) => handleSubmit(e)}>
                <CommunitySelect
                    initialValue={communityInfo}
                    onSelectCommunity={onSelectCommunity}
                />
                {/* Tabs */}
                <div className='bg-white w-full mt-2'>
                    <div className='w-full flex-around font-bold'>
                        {tabs.map(tab => <button key={tab.name} type="button"
                            className={`flex-center gap-[8px] w-full py-3 border-b border-r border-medium hover:bg-primary-light ${tab.name === active ? 'text-cate-blue border-b-cate-blue' : 'text-gray'}`}
                            onClick={() => { setActive(tab.name) }}>
                            <Image
                                alt={tab.name}
                                src={tab.name === active ? `/icons/${tab.icon}-fill.svg` : `/icons/${tab.icon}-outline.svg`}
                                height='0'
                                width='0'
                                className='w-[20px] h-[20px]'
                            />
                            {tab.name}</button>)}
                    </div>
                    <div className='p-2 min-h-[280px]'>
                        {/* Title */}
                        <div className='relative rounded-sm border border-medium mt-2'>
                            <textarea
                                minLength={10}
                                maxLength={300}
                                placeholder="Title"
                                className=" w-full overflow-x-hidden break-words focus:outline-none py-1 pl-2 pr-[40px] max-h-[102px] resize-none"
                                rows={1}
                                id="title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                            <span className="absolute right-4 top-2 label-sm">{title.length}/300</span>
                        </div>
                        {/* Text */}
                        {active === 'Post' && <div className='rounded-sm border border-medium mt-2'>
                            <textarea id="text"
                                name="text"
                                onChange={(e) => setText(e.target.value)}
                                value={text}
                                className=' w-full font-light px-2 py-3 min-h-[150px] focus:outline-none' placeholder='Text'
                            />
                        </div>}
                        {/* Image */}
                        {active === 'Image' && <div className='rounded-sm border border-medium mt-2 min-h-[250px]'>
                            {memoizedImage}
                        </div>}
                        {/* Url Link */}
                        {active === 'Link' && <div className='rounded-sm border border-medium mt-2'>
                            <textarea name="create-post"
                                className=' w-full font-light px-2 py-3 min-h-[150px] focus:outline-none'
                                value={urlLink}
                                placeholder='Url'
                                onChange={(e) => setUrlLink(e.target.value)}
                            />
                        </div>}
                        {/* Post Btn */}
                        <div className='flex-end gap-[10px] p-2'>
                            <Link href='/' className='button-main-outline'>Cancel</Link>
                            <button type="submit" className='button-main disable:cursor-not-allowed disabled:bg-medium' disabled={text === '' && urlLink === '' && imageUrl === ''}>{loading ? <LoadingIcon /> : 'Post'}</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreatePost