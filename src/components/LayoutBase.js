import React from "react"
import Header from "./Header"
import layoutStyles from "./layout.module.css"
import Helmet from "react-helmet"


export default (data) => {

    const children = data.children;

    return (
        <div className={layoutStyles.container}>
            <Helmet defaultTitle={`cedric-dumont`} titleTemplate={`%s | cedric-dumont`}>
                <meta name="description" content="a developer's braindump" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="cedric-dumont.com" />
                <meta name="docsearch:version" content="2.0" />
                <meta property="og:url" content="https://www.cedric-dumont.com" />
                <html lang="en" />
            </Helmet>
            <Header />
            <hr />
            {children}
        </div>
    )
}