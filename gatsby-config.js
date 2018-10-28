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
              ]
            }
          },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/posts`,
            },
        },
    ]
}