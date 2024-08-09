import React from 'react'
import { ReactSVG } from 'react-svg'

interface SVGWrapperProps {
    src: string,
    loadingComponent?: React.ReactNode,
    className: string
}

const SVGWrapper = ({ loadingComponent,src, ...props }: SVGWrapperProps) => {
    return (
        <ReactSVG src={src} {...props} loading={loadingComponent ? () => loadingComponent : undefined} />
    )
}

export { SVGWrapper }
