/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react'
import { useRouter } from 'next/router'
import { AboutCommunity, CreatePost, CreatePostRules, PageContainer, PageContentLayout } from '@/components'
import { useCommunityQuery } from '@/generated/graphql'

function CreatePostInCommunityPage() {
    // TODO: textarea expand and word count
    const router = useRouter()
    const communityName = router.query.community as string
    const { data: communityData } = useCommunityQuery({ variables: { communityName } })

    return (
        communityData?.community && <PageContainer>
            <PageContentLayout
                containerClassname='mt-[30px]'
                left={<CreatePost />}
                right={<>
                    <AboutCommunity communityInfo={communityData.community} isSubmitPost />
                    <CreatePostRules />
                </>}
            />
        </PageContainer>
    )
}

export default CreatePostInCommunityPage


