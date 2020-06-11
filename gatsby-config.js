module.exports = {
  siteMetadata: {
    title: `Platen`,
    description: `Write your next game with Platen, a project for providing scaffolding of digital tabletop roleplaying tools and other interactive web books.`,
    author: `@Platen`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-mdx`,
    // {
    //   resolve: `gatsby-plugin-mdx`,
    //   options: {
    //     // extensions: [`.mdx`, `.md`],
    //     defaultLayouts: {
    //       default: require.resolve(`${__dirname}/src/components/layout.js`),
    //     },
    //   },
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `pages`,
    //     path: `${__dirname}/src/pages`,
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `md-pages`,
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `csv`,
        path: `${__dirname}/content/csv`,
      },
    },
    // {
    //   resolve: `gatsby-transformer-remark`,
    //   options: {
    //     gfm: true,
    //     commonmark: true,
    //     footnotes: true,
    //     pedantic: true,
    //     plugins: [`gatsby-remark-autolink-headers`],
    //   },
    // },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require("tailwindcss"),
          require("./tailwind.config.js"), // Optional: Load custom Tailwind CSS configuration
        ],
      },
    },
    // `gatsby-plugin-catch-links`,
    // // this (optional) plugin enables Progressive Web App + Offline functionality
    // // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
