import React, { SVGProps } from 'react'

function ArrowIcon({
    type,
    ...props
}: SVGProps<SVGSVGElement> & {
    type: 'fill' | 'outline'
}) {
    return (
        <svg
            width="24"
            height="24"
            fill="#212121"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            style={{
                transform: 'rotate(90deg)',
            }}
        >
            {type === 'fill' ?
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm3.25-12.5h-4.74l5.268 5.217a.75.75 0 1 1-1.056 1.066L9.5 10.61v4.639a.75.75 0 0 1-1.5 0v-6.5A.75.75 0 0 1 8.75 8h6.5a.75.75 0 0 1 0 1.5Z" />
                :
                <><path d="M10.51 9.5h4.74a.75.75 0 0 0 0-1.5h-6.5a.75.75 0 0 0-.75.75v6.5a.75.75 0 0 0 1.5 0v-4.639l5.222 5.172a.75.75 0 0 0 1.056-1.066L10.509 9.5Z" /><path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-10 8.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Z" />
                </>
            }

        </svg>
    )
}

export default ArrowIcon

