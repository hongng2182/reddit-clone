/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect } from 'react'
import { CreatePost, CreatePostRules, PageContainer, PageContentLayout } from '@/components'
import { useMeQuery } from '@/generated/graphql'
import { useGlobalState } from '@/hooks'
import { setActiveFeedTab, setShowSignInModal } from '@/action'
import { tabs } from '@/lib/constants'


function CreatePostPage() {
  const { data: meData } = useMeQuery()
  const { dispatch } = useGlobalState()

  useEffect(() => {
    if (meData?.me === null) {
      dispatch(setShowSignInModal(true))
    }
    dispatch(setActiveFeedTab(tabs.createPost))
  }, [dispatch, meData?.me ])

  return (
    <PageContainer title='Submit to MiniReddit'>
      {meData?.me && <PageContentLayout
        containerClassname='mt-[30px]'
        left={<CreatePost />}
        right={<CreatePostRules />}
      />}
    </PageContainer>
  )
}

export default CreatePostPage