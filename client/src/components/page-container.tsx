import React, { ReactNode } from 'react'

function PageContainer({ children }: { children: ReactNode }) {
    return (
        <main className='flex min-h-[calc(100vh-48px)]'>
            <div className='flex-col-10 w-full'>
                <div className='xl:w-[1020px] w-[90%] mx-auto'>
                    {children}
                </div>
            </div>
        </main>
    )
}

export default PageContainer