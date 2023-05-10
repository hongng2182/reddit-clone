/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useRouter } from 'next/router'
import { PostDocument, usePostQuery } from '@/generated/graphql'
import { addApolloState, initializeApollo } from '@/lib/apolloClient'



export default function PostDetails({ isError: isErrorFromServer }: { isError: boolean }) {

    if (isErrorFromServer) {
        return <div>An errorn has happen</div>
    }

    const router = useRouter()
    const postId = router.query.id as string


    const { data } = usePostQuery({ variables: { postId: Number(postId) } })


    return (
        <div>PostsDetail
            {!data?.post && <p>Post does not exist</p>}
            {data?.post && <div>
                <h3 className="font-bold text-lg">{data.post.title}</h3>
                <p className="">Post id {data.post.id}</p>
                <p className="">Post by {data.post.user.username}</p>
                <p className="">{data.post.text}</p>
            </div>}
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

