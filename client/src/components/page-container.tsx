import React, { ReactNode } from 'react'
import Head from 'next/head'

function PageContainer({ children, title }: { children: ReactNode, title?: string }) {
    return (<>
        <Head>
            <title>{title && title}</title>
        </Head>
        <main className='flex min-h-[calc(100vh-48px)]'>
            <div className='flex-col-10 w-full'>
                <div className='xl:w-[1020px] w-[90%] mx-auto'>
                    {children}
                </div>
            </div>
        </main>
    </>
    )
}

PageContainer.defaultProps = {
    title: 'MiniReddit'
}

export default PageContainer