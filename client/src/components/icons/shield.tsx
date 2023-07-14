import React, { SVGProps } from 'react'

function ShieldIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg width="24" height="24"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}>
            <path d="M3 5.75A.75.75 0 0 1 3.75 5c2.663 0 5.258-.943 7.8-2.85a.75.75 0 0 1 .9 0C14.992 4.057 17.587 5 20.25 5a.75.75 0 0 1 .75.75V11c0 5.001-2.958 8.676-8.725 10.948a.75.75 0 0 1-.55 0C5.958 19.676 3 16 3 11V5.75Zm1.5.728V11c0 4.256 2.453 7.379 7.5 9.442 5.047-2.063 7.5-5.186 7.5-9.442V6.478c-2.577-.152-5.08-1.09-7.5-2.8-2.42 1.71-4.923 2.648-7.5 2.8Z" />
        </svg>
    )
}

export default ShieldIcon