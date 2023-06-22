import React, { SVGProps } from 'react'

function LockIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}>
            <path d="M12 2a4 4 0 0 1 4 4v2h2.5A1.5 1.5 0 0 1 20 9.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20.5v-11A1.5 1.5 0 0 1 5.5 8H8V6a4 4 0 0 1 4-4Zm0 11.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM12 4a2 2 0 0 0-2 2v2h4V6a2 2 0 0 0-2-2Z" fill="#878A8C" />
        </svg>
    )
}

export default LockIcon
