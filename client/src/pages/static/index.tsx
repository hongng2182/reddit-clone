import React from 'react'
import { TrendingPosts, Posts, PageContainer } from '@/components'

function HomePage() {
    // TODO: show feed when screen large on the left, with no title show

    return (
        <PageContainer>
            <TrendingPosts />
            <Posts />
            {/* <Feed /> */}
        </PageContainer>

    )
}

export default HomePage