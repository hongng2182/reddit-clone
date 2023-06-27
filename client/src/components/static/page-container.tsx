import React, { ReactNode } from 'react'

function PageContainer({ children, withFeed }: { children: ReactNode, withFeed?: boolean }) {
    return (
        <main className='flex min-h-[calc(100vh-48px)]'>
            <div className={`flex-col-10 w-full ${withFeed ? 'xl:ml-[270px]' : ''}`}>
                <div className='xl:w-[1020px] w-[90%] mx-auto'>
                    {children}
                </div>
            </div>
        </main>
    )
}

PageContainer.defaultProps = {
    withFeed: false
}
export default PageContainer