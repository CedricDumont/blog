import React from "react"
import { Link } from 'gatsby'
import LayoutBase from "../components/LayoutBase"

const AllTagsTemplate = ({data, pageContext}) => {
  const { tags } = pageContext
  return (
    
      <LayoutBase>
        <ul>
          {tags.map((tagName, index) => {
            return (
              <li key={index}>
                <Link to={`/tags/${tagName}`}>
                  {tagName}
                </Link>
              </li>
            )
          })}
        </ul>
      </LayoutBase>
   
  )
}

export default AllTagsTemplate