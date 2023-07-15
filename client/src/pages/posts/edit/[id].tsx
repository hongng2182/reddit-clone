/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { PostDocument, useMeQuery, usePostQuery } from '@/generated/graphql'
import { addApolloState, initializeApollo } from '@/lib/apolloClient'

export default function PostEdit({ isError: isErrorFromServer }: { isError: boolean }) {
    if (isErrorFromServer) {
        return <div>An error has happen</div>
    }
    const router = useRouter()
    const postId = router.query.id as string

    const { data: meData, error: meError } = useMeQuery()
    const { data: postData, error: postError } = usePostQuery({ variables: { postId: Number(postId) } })
    // const [updatePost] = useUpdatePostMutation()

    const [form, setForm] = useState({ title: postData?.post?.title ?? '', text: postData?.post?.text ?? '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }))
    }


    if (meError || postError) {
        return <div>An error has happen</div>
    }

    if (!postData?.post) {
        return <div>Post does not exist</div>
    }
    if (postData?.post && meData?.me && meData.me.id !== postData.post.ownerId) {
        return <div>You are not allowed to edit this post</div>
    }

    return (postData.post && meData?.me && meData?.me?.id === postData.post.ownerId &&
        <div>Posts Edit
            <div>
                <h3 className="font-bold text-lg">{postData.post.title}</h3>
                <form
                    className='flex flex-col gap-[10px]'
                    onSubmit={async (e) => {
                        e.preventDefault()
                        try {
                            // const response = await updatePost({
                            //     variables: {
                            //         updatePostId: Number(postId),
                            //         input: form
                            //     }
                            // })
                            // if (response.data?.updatePost) {
                            //     router.push('/')
                            // }
                        } catch (err) {
                            console.log(err)
                        }
                    }
                    }
                >
                    <label htmlFor='title'>Title
                        <input id="title" type="text" name="title" value={form.title}
                            onChange={(e) => handleChange(e)} />
                    </label>


                    <label htmlFor='text'>Post Content
                        <input
                            id="text"
                            type="text"
                            name="text"
                            onChange={(e) => handleChange(e)}
                            value={form.text}
                        />
                    </label>
                    <button type="submit" className='bg-blue-500  w-[5rem] rounded-xl p-1 text-white'>Update Post</button>
                </form>
            </div>
        </div>
    )

}



export const getServerSideProps = async (context: any) => {
    const { params } = context

    if (!params) return {
        props: {
            isError: true,
        },
    }

    const postId = params.id as string

    const postIdInt = Number(postId)

    if (Number.isNaN(postIdInt)) {
        return {
            props: {
                isError: true,
            },
        }
    }

    try {
        const apolloClient = initializeApollo()

        await apolloClient.query({
            query: PostDocument,
            variables: { postId: postIdInt }
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
