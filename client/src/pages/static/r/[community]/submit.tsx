/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { AboutCommunity, CreatePost, CreatePostRules, PageContainer, PageContentLayout } from '@/components'
import { MeDocument, useCommunityQuery, useMeQuery } from '@/generated/graphql'
import { addApolloState, initializeApollo } from '@/lib/apolloClient'
import { useGlobalState } from '@/hooks'
import { setShowSignInModal } from '@/action'

function CreatePostInCommunityPage() {
    // TODO: textarea expand and word count
    const router = useRouter()
    const communityName = router.query.community as string
    const { data: communityData } = useCommunityQuery({ variables: { communityName } })
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
                right={communityData?.community && <>
                    <AboutCommunity isUserLogin={false} isMod={false}
                        communityInfo={communityData.community} isSubmitPost />
                    <CreatePostRules />
                </>}
            />}
        </PageContainer>
    )
}

export default CreatePostInCommunityPage



export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

    const apolloClient = initializeApollo({ headers: context.req.headers })

    await apolloClient.query({
        query: MeDocument,
    })

    return addApolloState(apolloClient, {
        props: {}
    })
}