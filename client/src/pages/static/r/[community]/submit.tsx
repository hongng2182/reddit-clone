/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { AboutCommunity, CreatePost, CreatePostRules, PageContainer, PageContentLayout } from '@/components'
import { MeDocument, useCommunityQuery, useMeQuery } from '@/generated/graphql'
import { addApolloState, initializeApollo } from '@/lib/apolloClient'
import { useGlobalState } from '@/hooks'
import { setActiveFeedTab, setShowSignInModal } from '@/action'
import { tabs } from '@/lib/constants'

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
        dispatch(setActiveFeedTab(tabs.createPost))
    }, [])

    if (!communityData?.community) {
        return <div className='h-[80vh] min-h-[400px] flex flex-col justify-center items-center gap-[15px]'>
            <h3>Sorry, there aren’t any communities on MiniReddit with that name!</h3>
        </div>
    }

    return (
        <PageContainer>
            {meData?.me && <PageContentLayout
                containerClassname='mt-[30px]'
                left={<CreatePost communityInfo={communityData.community} />}
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