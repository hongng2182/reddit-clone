import React, { SVGProps } from 'react'

function LoadingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: 'auto',
        background: 'none',
        display: 'block',
        shapeRendering: 'auto'
      }}
      preserveAspectRatio="xMidYMid"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}>
      <circle cx="50" cy="50" r="35" strokeWidth="12" stroke="#ffffff" strokeDasharray="54.97787143782138 54.97787143782138" fill="none" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50" />
      </circle>
    </svg>
  )
}

export default LoadingIcon
