module.exports = {
    siteMetadata: {
        title: '{"@id":"cedric-dumont.com"}',
        description: "A developer's braindump"
    },
    plugins: [
       
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography.js`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    `gatsby-remark-copy-images`,
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: "language-",
                            inlineCodeMarker: null,
                            aliases: {},
                            showLineNumbers: false,
                            noInlineHighlight: false,
                        },
                    }
                ]
            }
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Cedric-Dumont`,
                short_name: `Cedu`,
                start_url: `/`,
                background_color: `#fff`,
                theme_color: `#988146`,
                display: `minimal-ui`,
                icon: `src/images/profile.jpeg`, // This path is relative to the root of the site.
            },
        },
        `gatsby-plugin-offline`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/posts`,
            },
        },
    ]
}