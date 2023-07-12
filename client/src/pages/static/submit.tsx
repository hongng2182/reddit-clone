/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { CreatePost, CreatePostRules, PageContainer, PageContentLayout } from '@/components'
import { MeDocument, useMeQuery } from '@/generated/graphql'
import { addApolloState, initializeApollo } from '@/lib/apolloClient'
import { useGlobalState } from '@/hooks'
import { setShowSignInModal } from '@/action'


function CreatePostPage() {
  // TODO: textarea expand and word count
  const { data: meData } = useMeQuery()
  const { dispatch } = useGlobalState()

  useEffect(() => {
    if (!meData?.me) {
      dispatch(setShowSignInModal(true))
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