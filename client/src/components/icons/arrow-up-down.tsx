import React, { SVGProps } from 'react'

function ArrowUpDown({
    type,
    variant,
    ...props
}: SVGProps<SVGSVGElement> & {
    type: 'up' | 'down'
    variant: 'fill' | 'outline'
}) {
    return (
        <svg
            width="24"
            height="24"
            fill="#7C7C7C"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        >
            {type === 'up' && variant === 'outline' && <path d="M16,13V21H8V13H2L12,3L22,13H16M7,11H10V19H14V11H17L12,6L7,11Z" />}

            {type === 'up' && variant === 'fill' && <path d="M15,20H9V12H4.16L12,4.16L19.84,12H15V20Z" />}

            {type === 'down' && variant === 'outline' && <path d="M22,11L12,21L2,11H8V3H16V11H22M12,18L17,13H14V5H10V13H7L12,18Z" />}

            {type === 'down' && variant === 'fill' && <path d="M9,4H15V12H19.84L12,19.84L4.16,12H9V4Z" />}
        </svg>
    )
}

export default ArrowUpDown