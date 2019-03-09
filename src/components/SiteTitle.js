import React from "react"
import { Link } from "gatsby";

const SiteTitle = ({ data }) => {

    const title = data.site.siteMetadata.title;
    const description = data.site.siteMetadata.description;

    return (
        <div>
            <Link to="/" style={{ textDecoration:`none`, textShadow: `none`, color:`black`}}>
                <h2 style={{ margin:`0 0 0 0`}}>{title}</h2>
            </Link>
            <div style={{fontWeight:`100`, fontSize:`0.8em`,textShadow: `none`, 
            color:`#988146`, marginTop:`0.5em`, marginBottom:`1em`}}>{description}</div>
        </div>
    )

}

export default SiteTitle;

