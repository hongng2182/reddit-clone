import React, { SVGProps } from 'react'

function RulesIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg width="35" height="35" fill="none" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}>
            <path d="M832 960H192s-64-2.133333-64-170.666667h768c0 168.533333-64 170.666667-64 170.666667z" fill="#42A5F5" /><path d="M170.666667 64h682.666666v725.333333H170.666667z" fill="#90CAF9" /><path d="M384 320h341.333333v42.666667H384zM384 405.333333h341.333333v42.666667H384zM384 490.666667h341.333333v42.666666H384zM384 576h341.333333v42.666667H384zM384 661.333333h341.333333v42.666667H384z" fill="#1976D2" /><path d="M298.666667 320h42.666666v42.666667h-42.666666zM298.666667 405.333333h42.666666v42.666667h-42.666666zM298.666667 490.666667h42.666666v42.666666h-42.666666zM298.666667 576h42.666666v42.666667h-42.666666zM298.666667 661.333333h42.666666v42.666667h-42.666666z" fill="#1976D2" /></svg>
    )
}

export default RulesIcon