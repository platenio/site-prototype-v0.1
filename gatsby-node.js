/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// Create META for MDX Pages
const regexAuthors = /^authors\/(?!index).+?.mdx/g
const regexBooks = /^(books\/)((?!chapter(s\b|\b)).)*(\/index.mdx)$/g
const regexChapters = /^(books\/)(.+?\/)(chapter(s\b|\b)-\d*.mdx)/g
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // Select only /src/pages/**/*.mdx
  if (node.relativePath && node.sourceInstanceName === "pages") {
    // --- Author Pages ---
    if (node.relativePath.match(regexAuthors)) {
      const slug = createFilePath({ node, getNode })

      createNodeField({
        name: "type",
        node,
        value: `author`,
      })
      createNodeField({
        name: "slug",
        node,
        value: `${slug}`,
      })

      // --- Book Pages ---
    } else if (node.relativePath.match(regexBooks)) {
      const slug = createFilePath({ node, getNode })
      const book = node.relativePath.replace("books/", "").replace(/\/.*/g, "")

      createNodeField({
        name: "type",
        node,
        value: `book`,
      })
      createNodeField({
        name: "slug",
        node,
        value: `${slug}`,
      })
      createNodeField({
        name: "book",
        node,
        value: `${book}`,
      })

      // --- Chapter Pages ---
    } else if (node.relativePath.match(regexChapters)) {
      const slug = createFilePath({ node, getNode })
      const book = node.relativePath.replace("books/", "").replace(/\/.*/g, "")
      const chapter = node.relativePath
        .replace(/^(books\/)(.+?\/)(chapter(s\b|\b)-)/g, "")
        .replace(/.mdx/g, "")

      createNodeField({
        name: "type",
        node,
        value: `chapter`,
      })
      createNodeField({
        name: "slug",
        node,
        value: `${slug}`,
      })
      createNodeField({
        name: "chapter",
        node,
        value: `${chapter}`,
      })
      createNodeField({
        name: "book",
        node,
        value: `${book}`,
      })

      // --- Underpages ---
    } else {
      const slug = createFilePath({ node, getNode })

      createNodeField({
        name: "type",
        node,
        value: `underpage`,
      })
      createNodeField({
        name: "slug",
        node,
        value: `${slug}`,
      })
    }
  }
}

// Build pages
const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // ------------------
  // Create Authors
  // ------------------
  let queryAuthors = await graphql(`
    query {
      allFile(filter: { fields: { type: { eq: "author" } } }) {
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
  if (queryAuthors.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const authors = queryAuthors.data.allFile.edges

  authors.forEach(({ node }, index) => {
    const slug = node.fields.slug
    const template = path.resolve(`./src/templates/Authors/Author.js`)

    createPage({
      path: slug,
      component: template,
      context: { id: node.id },
    })
  })

  // ------------------
  // Create Books & Pages
  // ------------------
  let queryBooks = await graphql(`
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
  if (queryBooks.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const books = queryBooks.data.allFile.edges

  books.forEach(({ node }, index) => {
    const slug = node.fields.slug
    const templateBook = path.resolve(`./src/templates/Books/Book/Book.js`)
    const templateBookContents = path.resolve(
      `./src/templates/Books/Book/Contents.js`
    )

    // About
    createPage({
      path: slug,
      component: templateBook,
      context: { id: node.id },
    })

    // Contents
    createPage({
      path: slug + "contents/",
      component: templateBookContents,
      context: { id: node.id },
    })
  })

  // ------------------
  // Create Book Chapters
  // ------------------
  let queryBookChapters = await graphql(`
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
  if (queryBookChapters.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const chapters = queryBookChapters.data.allFile.edges

  chapters.forEach(({ node }, index) => {
    const slug = node.fields.slug
    const template = path.resolve(`./src/templates/Books/Book/Chapter.js`)

    createPage({
      path: slug,
      component: template,
      context: { id: node.id },
    })
  })

  // ------------------
  // Create Underpages
  // ------------------
  let queryPages = await graphql(`
    query {
      allFile(filter: { fields: { type: { eq: "underpage" } } }) {
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
  if (queryPages.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const pages = queryPages.data.allFile.edges

  pages.forEach(({ node }, index) => {
    const slug = node.fields.slug
    const template = path.resolve(`./src/templates/Underpage.js`)

    createPage({
      path: slug,
      component: template,
      context: { id: node.id },
    })
  })
}
