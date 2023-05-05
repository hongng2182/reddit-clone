import React from "react"
import { Navbar } from "@/components"
import { addApolloState, initializeApollo } from "@/lib/apolloClient"
import { PostsDocument, usePostsQuery } from "@/generated/graphql"

export default function Home() {
  const { data } = usePostsQuery()
  return <>
    <Navbar />
    <div>Hello World</div>
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