/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react'
import { CreatePost, PageContainer, PageContentLayout } from '@/components'
import { RulesIcon } from '@/components/icons'
import { postingRules } from '@/mockup'


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


function CreatePostRules() {
  return <div className='px-2 mb-3'>
    <div className='py-2 flex-start-10 border-b border-medium'>
      <RulesIcon />
      <h3>Posing to MiniReddit</h3>
    </div>
    {postingRules.map(rule => <p className='label-md border-b border-medium py-2 px-3'>{rule}</p>)}
  </div>
}