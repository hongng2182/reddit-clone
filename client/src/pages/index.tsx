import React from "react"
import Link from "next/link"
import { Navbar } from "@/components"
import { addApolloState, initializeApollo } from "@/lib/apolloClient"
import { PostsDocument, usePostsQuery } from "@/generated/graphql"

export default function Home() {
  const { data } = usePostsQuery()
  return <>
    <Navbar />
    <div>Hello World</div>
    <button type="button" className='bg-blue-500  w-[5rem] rounded-xl p-1 text-white'>
      <Link href="/create-post">Create Post</Link>
    </button>
    <ul>
      {data?.posts.map(post => <li>{post.title}</li>)}
    </ul>
  </>
}


export const getStaticProps = async () => {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: PostsDocument
  })

  return addApolloState(apolloClient, {
    props: {}
  })
}