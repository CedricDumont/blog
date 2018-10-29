import React from "react"
import { StaticQuery, graphql } from "gatsby";
import SiteTitle from "./SiteTitle"
import Navigation from "./Navigation"


const MyHeaderLayout = ({ data }) => {
    return (
        <div>
            <SiteTitle data={data} />
            <Navigation />
        </div>
    )
}


const Header = () => {
    return (
        <StaticQuery
            query={graphql`
                query {
                    site{
                      siteMetadata {
                        title
                        description
                      }
                    }
                  }
            `}
            render={(data) => <div><MyHeaderLayout data={data} /></div>}
        />
    );
}


export default Header;
