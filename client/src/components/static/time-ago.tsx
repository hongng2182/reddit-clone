import React from 'react'
import { getTimeAgo } from '@/utils'

function TimeAgo ({ time }: { time: string }) {
    const timeAgo = getTimeAgo(Number(time))
   return <span className='text-gray text-xs'>{timeAgo}</span>
    
    }

export default TimeAgo

