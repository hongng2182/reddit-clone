/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react'
import { CreatePost, CreatePostRules, PageContainer, PageContentLayout } from '@/components'


function CreatePostPage() {
  // TODO: textarea expand and word count

  return (
    <PageContainer>
      <PageContentLayout
        containerClassname='mt-[30px]'
        left={<CreatePost />}
        right={<CreatePostRules />}
      />
    </PageContainer>
  )
}

export default CreatePostPage