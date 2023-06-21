import React, { SVGProps } from 'react'

function UpIcon({
    type,
    ...props
}: SVGProps<SVGSVGElement> & {
    type: 'fill' | 'outline'
}) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        >
            {type === 'fill' ?
                <path d="M19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21M12,7L7,12H10V16H14V12H17L12,7Z" fill="#287DBE" />
                :
                <path d="M12,7L17,12H14V16H10V12H7L12,7M19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21M19,19V5H5V19H19Z" fill="#7C7C7C" />
            }
        </svg>
    )
}

export default UpIcon