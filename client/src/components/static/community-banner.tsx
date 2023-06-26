import React from 'react'
import Image from 'next/image'


function CommunityBanner() {
    return (
        <div className='h-[250px]'>
            <div className='h-[150px] bg-primary' />
            <div className='h-[90px] bg-white'>
                <div className='main-container relative bg-slate-400'>
                    <div className="absolute  top-[-16px] left-0  flex-start-10" >
                        <div className='w-[80px] h-[80px] rounded-full bg-slate-600 border-4 border-white'>
                            <Image
                                height='0'
                                width='0'
                                src='/demo.png'
                                alt='logo'
                                sizes='100%'
                                className='w-full h-full rounded-full'
                            />
                        </div>
                        <div className='mt-[20px] flex-col-start'>
                            <div className='flex-start gap-[20px]'>
                                <h1>Twice</h1>
                                <button type="button" className='button-main-outline'>Joined</button>
                            </div>
                            <span className='label-sm'>r/twice</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommunityBanner