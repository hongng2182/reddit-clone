import React from "react"
import Link from "next/link"
import { NetworkStatus, Reference } from "@apollo/client"
import { Navbar } from "@/components"
import { addApolloState, initializeApollo } from "@/lib/apolloClient"
import { PaginatedPosts, PostsDocument, useDeletePostMutation, useMeQuery, usePostsQuery } from "@/generated/graphql"

const FETCH_LIMIT = 10

export default function Home() {
  const { data, fetchMore, networkStatus } = usePostsQuery({ variables: { first: FETCH_LIMIT, after: null }, notifyOnNetworkStatusChange: true })
  const { data: meData } = useMeQuery()
  const isLoadingMorePosts = networkStatus === NetworkStatus.fetchMore
  const [delelePost] = useDeletePostMutation()

  const handleDeletePost = async (postId: number) => {
    await delelePost({
      variables: { deletePostId: postId }, update(cache, { data: deleteData }) {
        if (deleteData?.deletePost) {
          cache.modify({
            fields: {
              posts(existing: Pick<PaginatedPosts,
                '__typename' | 'pageInfo'> & { paginatedPosts: Reference[] }) {

                const newEndCursor = existing.pageInfo.endCursor ? parseInt
                  (Buffer.from(existing.pageInfo.endCursor, 'base64').toString(), 10) - 1 : null

                const newpageInfo = newEndCursor ?
                  {
                    ...existing.pageInfo,
                    endCursor: Buffer.from((newEndCursor).toString()).toString('base64')
                  } :
                  { ...existing.pageInfo }

                const newPostsAfterDelete = {
                  ...existing,
                  pageInfo: newpageInfo,
                  // eslint-disable-next-line no-underscore-dangle
                  paginatedPosts: existing.paginatedPosts.filter(postRef => postRef.__ref !== `Post:${postId}`)
                }
                return newPostsAfterDelete
              }
            }
          })
        }
      }
    })
  }


  return <>
    <Navbar />
    <div className="w-[75%] mx-auto">
      <section className="flex flex-col gap-[20px]">
        {data?.posts.paginatedPosts.map(post => <div key={post.id} className="shadow-md p-3" >
          < Link href={`/posts/${post.id}`}>
            <h3 className="font-bold text-lg">{post.title}</h3>
            <p className="">Post id {post.id}</p>
            <p className="">Post by {post.user.username}</p>
            <p className="">{post.textSnippet}</p>
          </Link>
          {meData?.me?.id === post.ownerId ? <div className="flex gap-1">
            <Link href={`/posts/edit/${post.id}`} className="bg-gray-500 text-white p-1"
            >Update</Link>
            <button type="button" className="bg-red-500 text-white p-1"
              onClick={() => {
                handleDeletePost(post.id)
              }}
            >Delete</button>
          </div> : null}
        </div>)}

        {data?.posts.pageInfo.hasNextPage &&
          <button type="button"
            className='bg-blue-500  w-[10rem] rounded-xl p-1 text-white'
            onClick={() => fetchMore({ variables: { first: FETCH_LIMIT, after: data?.posts.pageInfo.endCursor } })}>
            {isLoadingMorePosts ? 'Loading' : 'Load more'}
          </button>}
      </section>
    </div>
  </>
}


export const getStaticProps = async () => {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: PostsDocument,
    variables: { first: FETCH_LIMIT, after: null }
  })

  return addApolloState(apolloClient, {
    props: {}
  })
}