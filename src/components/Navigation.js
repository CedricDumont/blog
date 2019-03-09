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
            <li style={{ display: `inline-block`, marginRight: `1rem` }}>
                <a href="https://github.com/CedricDumont/blog/issues" target="_blank" rel="noopener noreferrer">Questions ?</a>
            </li>
        </ul>
    )
}

export default Navigation;