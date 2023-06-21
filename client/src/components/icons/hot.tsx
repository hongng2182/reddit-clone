import React, { SVGProps } from "react"

function FireIcon({
    type,
    ...props
}: SVGProps<SVGSVGElement> & {
    type: 'fill' | 'outline'
}) {
    return (
        <svg
            width="20"
            height="20"
            fill="#287DBE"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        >
            {type === 'fill' ?
                <path d="M17.4,8.38A7.1,7.1,0,0,1,15,3a1,1,0,0,0-1.55-.83,10.89,10.89,0,0,0-5,6.73A4.37,4.37,0,0,1,8,7.77,1,1,0,0,0,7.27,7a1,1,0,0,0-1,.25C5,8.58,4,12,4,14c0,5.08,2.92,8,8,8s8-3,8-8C20,11.22,18.62,9.71,17.4,8.38Z" />
                :
                <path d="M12,21c3.9,0,7-2,7-7S14,9,14,3c-3,2-4.37,4.1-5,8A5,5,0,0,1,7,8c-1,1-2,4-2,6C5,17.14,6.28,21,12,21Z" fill='none' stroke="#7C7C7C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            }
        </svg>
    )
}

export default FireIcon