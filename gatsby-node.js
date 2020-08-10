/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const regexPages = /^pages\//g
const regexBooks = /^(books\/)((?!chapter(s\b|\b)).)*(\/index.mdx)$/g
const regexChapters = /^(books\/)(.+?\/)(chapter(s\b|\b)\/+?)(\d*\/)(index.mdx)/g

const { createFilePath } = require("gatsby-source-filesystem")

// Create slugs for MDX Pages
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // if (node.internal.type === "Mdx") {
  //   // console.log("MATCHED PAGE", { node })
  //   node.relativePath && console.log("MATCHED PAGE", node.relativePath)
  //   // if (node.relativePath) {
  //   // if (node.relativePath.match(/^pages\//g)) {
  //   // console.log("MATCHED PAGE", value)
  //   // }
  //   // }
  // }
  if (node.relativePath) {
    const value = createFilePath({ node, getNode })

    if (node.relativePath.match(regexPages)) {
      // console.log("PAGE", node.relativePath)
      const slug = value.replace("pages/", "")

      createNodeField({
        name: "type",
        node,
        value: `page`,
      })
      createNodeField({
        name: "slug",
        node,
        value: `${slug}`,
      })
    }
    if (node.relativePath.match(regexBooks)) {
      // console.log("BOOK", node.relativePath)

      const book = node.relativePath.replace("books/", "").replace(/\/.*/g, "")

      createNodeField({
        name: "type",
        node,
        value: `book`,
      })
      createNodeField({
        name: "slug",
        node,
        value: `${value}`,
      })
      createNodeField({
        name: "book",
        node,
        value: `${book}`,
      })
    }

    if (node.relativePath.match(regexChapters)) {
      // console.log("CHAPTER", node.relativePath)
      const book = node.relativePath.replace("books/", "").replace(/\/.*/g, "")
      const chapter = node.relativePath
        .replace(/^(books\/)(.+?\/)(chapter(s\b|\b)\/+?)/g, "")
        .replace(/\/.*/g, "")

      createNodeField({
        name: "type",
        node,
        value: `chapter`,
      })
      createNodeField({
        name: "chapter",
        node,
        value: `${chapter}`,
      })
      createNodeField({
        name: "slug",
        node,
        value: `${value}`,
      })
      createNodeField({
        name: "book",
        node,
        value: `${book}`,
      })
    }
  }
}

const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // ------------------
  // Create Pages
  // ------------------
  let pagesQuery = await graphql(`
    query {
      allFile(filter: { fields: { type: { eq: "page" } } }) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  if (pagesQuery.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const pages = pagesQuery.data.allFile.edges

  pages.forEach(({ node }, index) => {
    const slug = node.fields.slug.replace(/\pages\//g, "")

    createPage({
      path: slug,
      component: path.resolve(`./src/components/Layouts/Underpage.js`),
      context: { type: "page", id: node.id },
    })
  })

  // ------------------
  // Create Book Pages
  // ------------------
  //
  let booksQuery = await graphql(`
    query {
      allFile(filter: { fields: { type: { eq: "book" } } }) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  if (booksQuery.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const books = booksQuery.data.allFile.edges

  books.forEach(({ node }, index) => {
    const slug = node.fields.slug

    createPage({
      path: slug,
      component: path.resolve(`./src/components/Layouts/Book.js`),
      context: { id: node.id },
    })
  })

  // ------------------
  // Create Book Pages
  // ------------------
  //
  let chaptersQuery = await graphql(`
    query {
      allFile(filter: { fields: { type: { eq: "chapter" } } }) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  if (chaptersQuery.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const chapters = chaptersQuery.data.allFile.edges

  chapters.forEach(({ node }, index) => {
    const slug = node.fields.slug

    createPage({
      path: slug,
      component: path.resolve(`./src/components/Layouts/Chapter.js`),
      context: { id: node.id },
    })
  })
}
