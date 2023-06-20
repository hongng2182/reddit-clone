import React from 'react'
import { Header, TrendingPosts } from '@/components'

function HomePage() {
    // TODO: show feed when screen large on the left, with no title show

    return (
        <>
            <Header />
            <main className='flex min-h-[calc(100vh-48px)]'>
                <div className='flex-col-10 xl:ml-[270px] w-full'>
                    <div className='2xl:w-[1020px] w-[90%] mx-auto'>
                        <TrendingPosts />
                        {/* <Posts /> */}
                        {/* <Feed /> */}
                    </div>
                </div>
            </main>
        </>
    )
}

export default HomePage