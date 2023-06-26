import React from 'react'
import { CalendarIcon } from '../icons'

function CommunityInfo() {
    return (
        <div className='w-full mb-3'>
            <p className='p-3 bg-cate-blue text-white font-bold w-full'>About Community</p>
            <div className='pt-3 flex-col-start-10 mx-auto w-[90%]'>
                <div className='flex w-full gap-[20px]'>
                    <div>
                        <p>268k</p>
                        <p>Members</p>
                    </div>
                    <div><p>1250</p>
                        <p>Online</p></div>
                </div>
                <div className='flex-start-10 text-gray'>
                    <CalendarIcon />
                    Created Apr 29, 2015
                </div>
                <button type="button" className='button-main w-full'>Create Post</button>
            </div>
        </div>
    )
}

export default CommunityInfo