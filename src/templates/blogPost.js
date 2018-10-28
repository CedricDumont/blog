import React from 'react'
import { graphql, Link } from 'gatsby'

import LayoutBase from "../components/LayoutBase"

const Template = ({data, pageContext}) => {
  const {next, prev} = pageContext

  const {markdownRemark} = data
  const title = markdownRemark.frontmatter.title
  const html = markdownRemark.html
  return (

    <LayoutBase>
      <h3 >{title}</h3>
      <div 
        dangerouslySetInnerHTML={{__html: html}}
      />

      <div >
        {next &&
          <Link to={next.fields.slug}>
            Next: {`${next.fields.slug}`}
          </Link>
        }
      </div>
      <div >
        {prev &&
          <Link to={prev.fields.slug}>
            Prev: {`${prev.fields.slug}`}
          </Link>
        }
      </div>
    </LayoutBase>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(fields: { slug: {eq: $pathSlug} }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default Template