// const { typeNameFromFile } = require("gatsby-transformer-csv")

module.exports = {
  siteMetadata: {
    title: `Platen`,
    description: `Write your next game with Platen, a project for providing scaffolding of digital tabletop roleplaying tools and other interactive web books.`,
    author: `@Platen`,
  },
  plugins: [
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `globals`,
    //     path: `${__dirname}/src/globals`,
    //   },
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `csv`,
    //     path: `${__dirname}/static/csv`,
    //   },
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `page`,
    //     path: `${__dirname}/src/pages/`,
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `post`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `book`,
        path: `${__dirname}/content/books`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `author`,
        path: `${__dirname}/content/authors`,
      },
    },
    `gatsby-plugin-mdx`,
    // `gatsby-transformer-remark`,
    `gatsby-transformer-json`,
    `gatsby-transformer-yaml`,
    // {
    //   resolve: `gatsby-plugin-mdx`,
    //   options: {
    //     gatsbyRemarkPlugins: [
    //       {
    //         resolve: `gatsby-remark-images`,
    //         options: {
    //           maxWidth: 1200,
    //         },
    //       },
    //       {
    //         resolve: `gatsby-remark-copy-linked-files`,
    //         options: {
    //           ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`],
    //         },
    //       },
    //     ],
    //   },
    // },

    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Open Sans:400,700,800", "Fira Code:300,400,700"],
        },
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-smoothscroll`,
    // `gatsby-plugin-sharp`,
    // `gatsby-remark-images`,
    // `gatsby-transformer-sharp`,

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
