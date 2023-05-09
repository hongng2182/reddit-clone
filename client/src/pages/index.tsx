import React from "react"
import Link from "next/link"
import { NetworkStatus } from "@apollo/client"
import { Navbar } from "@/components"
import { addApolloState, initializeApollo } from "@/lib/apolloClient"
import { PostsDocument, usePostsQuery } from "@/generated/graphql"

const FETCH_LIMIT = 10

export default function Home() {
  const { data, fetchMore, networkStatus } = usePostsQuery({ variables: { first: FETCH_LIMIT, after: null }, notifyOnNetworkStatusChange: true })

  const isLoadingMorePosts = networkStatus === NetworkStatus.fetchMore

  return <>
    <Navbar />
    <div className="w-[75%] mx-auto">
      <button type="button" className='bg-blue-500  w-[10rem] rounded-xl p-1 text-white'>
        <Link href="/create-post">Create Post</Link>
      </button>
      <section className="flex flex-col gap-[20px]">
        {data?.posts.paginatedPosts.map(post => <div key={post.id} className="shadow-md p-3">
          <h3 className="font-bold text-lg">{post.title}</h3>
          <p className="">Post id {post.id}</p>
          <p className="">Post by {post.user.username}</p>
          <p className="">{post.textSnippet}</p>
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