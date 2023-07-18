import React, { SVGProps } from 'react'

function ExpandIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg width="24" height="24"
            fill="#212121" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}>
            <path d="M7.669 14.923a1 1 0 0 1 1.414 1.414l-2.668 2.667H8a1 1 0 0 1 .993.884l.007.116a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4a1 1 0 1 1 2 0v1.587l2.669-2.668Zm8.336 6.081a1 1 0 1 1 0-2h1.583l-2.665-2.667a1 1 0 0 1-.083-1.32l.083-.094a1 1 0 0 1 1.414 0l2.668 2.67v-1.589a1 1 0 0 1 .883-.993l.117-.007a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4ZM8 3a1 1 0 0 1 0 2H6.417l2.665 2.668a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.414 0L5 6.412V8a1 1 0 0 1-.883.993L4 9a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4Zm12.005 0a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V6.412l-2.668 2.67a1 1 0 0 1-1.32.083l-.094-.083a1 1 0 0 1 0-1.414L17.589 5h-1.584a1 1 0 0 1-.993-.883L15.005 4a1 1 0 0 1 1-1h4Z" />
        </svg >
    )
}

export default ExpandIcon