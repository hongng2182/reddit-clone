import React, { SVGProps } from 'react'

function UploadIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg width="24" height="24"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            fill="#7C7C7C"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}>
            <path d="M14,13V17H10V13H7L12,8L17,13M19.35,10.03C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.03C2.34,8.36 0,10.9 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.03Z" />
        </svg>
    )
}

export default UploadIcon