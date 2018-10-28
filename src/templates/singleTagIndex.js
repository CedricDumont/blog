import React from "react"
import {  Link } from 'gatsby'
import LayoutBase from "../components/LayoutBase"


const SingleTagTemplate = ({data, pageContext}) => {
  const { posts, tagName } = pageContext
  return (
    <LayoutBase >
      <div>
        Posts about {`${tagName}`}
      </div>
      <div>
        <ul>
          {posts.map((post, index) => {
            return (
              <li key={index}>
                <Link to={post.frontmatter.path}>
                  {post.frontmatter.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </LayoutBase>
  )
}

export default SingleTagTemplate
