import React from 'react'
import { postingRules } from '@/mockup'
import { RulesIcon } from '../icons'

function CreatePostRules() {
    return <div className='px-2 mb-3 white-gray-rounded'>
        <div className='py-2 flex-start-10 border-b border-medium'>
            <RulesIcon />
            <h3>Posing to MiniReddit</h3>
        </div>
        {postingRules.map(rule => <p className='label-md border-b border-medium py-2 px-3'>{rule}</p>)}
    </div>
}

export default CreatePostRules