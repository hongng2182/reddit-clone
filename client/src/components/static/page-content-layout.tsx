import React, { ReactNode } from 'react'

type PageProps = {
    left: ReactNode,
    right?: ReactNode
}
function PageContentLayout({ left, right }: PageProps) {
    return (
        <div className='flex justify-between mb-5'>
            <div className='_995:max-w-[640px]  _995:w-[calc(100%-330px)] w-full flex-col-start-10'>
                {left}
            </div>
            {right && <div className='_995M:hidden sm:w-[310px] white-gray-rounded flex-col-start-10 h-fit'>
                {right}
            </div>}
        </div>
    )
}

PageContentLayout.defaultProps = {
    right: null
};

export default PageContentLayout