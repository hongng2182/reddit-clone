import React from 'react'
import { Header, Posts } from '@/components'

function HomePage() {
    return (
        <>
            <Header />
            <main className='flex min-h-[calc(100vh-48px)]'>
                <Posts />
            </main>
        </>
    )
}

export default HomePage