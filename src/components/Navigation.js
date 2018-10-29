import React from "react"
import { Link } from "gatsby";

const ListLink = props => (
    <li style={{ display: `inline-block`, marginRight: `1rem` }}>
        <Link to={props.to}>{props.children}</Link>
    </li>
)

const Navigation = () => {
    return (
        <ul style={{ marginBottom: `1em`}}>
            <ListLink to="/">Home</ListLink>
            <ListLink to="/me/">Me</ListLink>
            <ListLink to="/blog/">Blog</ListLink>
        </ul>
    )

}

export default Navigation;