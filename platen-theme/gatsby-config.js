const path = require("path")

console.log('## PATH', path.join(__dirname, 'content/blog'))
// const { typeNameFromFile } = require("gatsby-transformer-csv")

// var netlifyCmsPaths = {
//   resolve: `gatsby-plugin-netlify-cms-paths`,
//   options: {
//     cmsConfig: `/static/admin/config.yml`,
//   },
// }

module.exports = {
  siteMetadata: {
    title: `Platen`,
    description: `Write your next game with Platen, a project for providing scaffolding of digital tabletop roleplaying tools and other interactive web books.`,
    author: `@Platen`,
  },
  plugins: [
    // `gatsby-plugin-netlify-cms`,
    // `gatsby-transformer-sharp`,
    // `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-transformer-remark`,
    //   options: {
    //     plugins: [
    //       // netlifyCmsPaths,
    //       {
    //         resolve: `gatsby-remark-images`,
    //         options: {
    //           maxWidth: 960,
    //           backgroundColor: "transparent", // allows blur
    //         },
    //       },
    //       // {
    //       //   resolve: `gatsby-remark-copy-linked-files`,
    //       //   options: {
    //       //     ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`],
    //       //   },
    //       // },
    //     ],
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `author`,
        path: path.join(__dirname, 'content/authors'),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `book`,
        path: path.join(__dirname, 'content/library'),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `post`,
        path: path.join(__dirname, 'content/blog'),
      },
    },
    `gatsby-plugin-mdx`,
    // `gatsby-transformer-json`,
    // `gatsby-transformer-yaml`,
    // `gatsby-plugin-react-helmet`,
    // {
    //   resolve: "gatsby-plugin-web-font-loader",
    //   options: {
    //     google: {
    //       families: ["Open Sans:400,700,800", "Fira Code:300,400,700"],
    //     },
    //   },
    // },
    // `gatsby-plugin-postcss`,
    // `gatsby-plugin-emotion`,
    // `gatsby-plugin-styled-components`,
    // `gatsby-plugin-smoothscroll`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
