import React from "react"
import { graphql, Link } from 'gatsby'

import LayoutBase from "../components/LayoutBase"

const Layout = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <LayoutBase>
      <div>
        {edges.map(edge => {
          console.log('node is', edge);
          const { frontmatter , fields} = edge.node
          return (
            <div
              key={fields.slug}
              style={{ marginBottom: '1rem' }}
            >
              <Link to={fields.slug}>
                {frontmatter.title}
              </Link>
            </div>
          )
        })}

        <div>
          <Link to='/tags'>Browse by Tag</Link>
        </div>
      </div>
    </LayoutBase>
  )
}

export const query = graphql`
  query HomepageQuery {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
        }
      }
    } 
  }
`

export default Layout 