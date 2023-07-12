/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { CreatePost, CreatePostRules, PageContainer, PageContentLayout } from '@/components'
import { MeDocument, useMeQuery } from '@/generated/graphql'
import { addApolloState, initializeApollo } from '@/lib/apolloClient'


function CreatePostPage() {
  // TODO: textarea expand and word count
  const router = useRouter()
  const { data: meData } = useMeQuery()

  useEffect(() => {
    if (!meData?.me) {
      router.push('/login')
    }
  }, [])

  return (
    <PageContainer>
      {meData?.me && <PageContentLayout
        containerClassname='mt-[30px]'
        left={<CreatePost />}
        right={<CreatePostRules />}
      />}
    </PageContainer>
  )
}

export default CreatePostPage

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

  const apolloClient = initializeApollo({ headers: context.req.headers })

  await apolloClient.query({
    query: MeDocument,
  })

  return addApolloState(apolloClient, {
    props: {}
  })
}