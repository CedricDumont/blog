import React from "react"
import { graphql, Link } from 'gatsby'

import LayoutBase from "../components/LayoutBase"

const Layout = ({ data }) => {
    const { edges } = data.allMarkdownRemark
    return (
        <LayoutBase>
            <div style={{fontSize: `0.7rem`}}>
                <Link to='/tags'>Browse by Tag</Link>
            </div>
            <p></p>
            <div>
                {edges.map(edge => {
                    const { frontmatter, fields } = edge.node
                    return (
                        <div
                            key={fields.slug}
                            style={{ marginBottom: '1rem' }}
                        >
                            <Link to={fields.slug}>
                                <div>{frontmatter.title}</div>
                                <div style={{fontSize: `0.7rem`}}>
                                    {new Intl.DateTimeFormat('en-GB', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: '2-digit'
                                    }).format(new Date(frontmatter.date))}
                                </div>
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
  query BlogpageQuery {
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