import React from "react"
import ContentLoader from "react-content-loader"

const PizzaBlockSkeleton = (props) => (
    <ContentLoader
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        className={`pizza-block`}
        {...props}
    >
        <circle cx="130" cy="130" r="130" />
        <rect x="0" y="272" rx="0" ry="0" width="270" height="24" />
        <rect x="0" y="310" rx="10" ry="10" width="270" height="85" />
        <rect x="0" y="425" rx="0" ry="0" width="89" height="27" />
        <rect x="118" y="420" rx="30" ry="25" width="155" height="45" />
    </ContentLoader>
)

export default PizzaBlockSkeleton;