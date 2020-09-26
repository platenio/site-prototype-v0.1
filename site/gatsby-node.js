const fs = require("fs")
const get = require("lodash.get")

const postPath = "content/posts"
const bookPath = "content/books"
const authPath = "content/authors"

//  Check paths
exports.onPreBootstrap = ({ reporter }) => {
  if (!fs.existsSync(postPath)) {
    reporter.info(`creating the ${postPath} directory`)
    fs.mkdirSync(postPath)
  }
  if (!fs.existsSync(bookPath)) {
    reporter.info(`creating the ${bookPath} directory`)
    fs.mkdirSync(bookPath)
  }
  if (!fs.existsSync(authPath)) {
    reporter.info(`creating the ${authPath} directory`)
    fs.mkdirSync(authPath)
  }
}

// Define types
exports.sourceNodes = ({ actions, schema }) => {
  const splitProxyString = str =>
    str.split(".").reduceRight((acc, chunk) => {
      return { [chunk]: acc }
    }, true)

  actions.createFieldExtension({
    name: "proxyResolve",
    args: {
      from: { type: "String" },
    },
    extend: (options, previousFieldConfig) => {
      return {
        resolve: async (source, args, context, info) => {
          await context.nodeModel.prepareNodes(
            info.parentType, // PostMdx
            splitProxyString(options.from), // querying for html field
            splitProxyString(options.from), // resolving field
            [info.parentType.name] // the types to use are these
          )

          const newSource = await context.nodeModel.runQuery({
            type: info.parentType,
            query: { filter: { id: { eq: source.id } } },
            firstOnly: true,
          })

          return get(newSource.__gatsby_resolved, options.from)
        },
      }
    },
  })

  actions.createTypes([
    `
    interface MdxPost @nodeInterface {
      id: ID!
      slug: String!
      lastUpdated: Date @dateformat

      title: String!
      author: String!
      publishedAt: Date @dateformat
      cats: [String]!
      tags: [String]
      blurb: String
      body: String!
    }
    interface MdxBook @nodeInterface {
      id: ID!
      slug: String!
      lastUpdated: Date! @dateformat

      title: String!
      author: String! @proxyResolve(from: "parent.frontmatter.author")
      publishedAt: Date! @dateformat
      languages: [String]!
      audience: String!
      genres: [String]!
      tags: [String]
      blurb: String
      body: String!
    }
    interface MdxAuthor @nodeInterface {
      id: ID!
      slug: String!
      lastUpdated: Date! @dateformat

      name: String!
      user: String!
      joined: Date! @dateformat
      social: [String]
      blurb: String
      body: String!
    }

    type Mdx implements Node @infer {
      frontmatter: MdxFrontmatter!
    }
    type MdxFrontmatter @infer {
      publishedAt: Date @dateformat
      lastUpdated: Date @dateformat
      blurb: String
      tags: [String]

      # Post
      cats: [String]

      # Book
      languages: String
      audience: String
      genres: String

      # Author
      author: String
      joined: Date @dateformat
      social: [String]
    }

    type Post implements Node & MdxPost @dontInfer @childOf(type: "Mdx") {
      id: ID!
      slug: String! @proxyResolve(from: "parent.slug")
      title: String! @proxyResolve(from: "parent.frontmatter.title")
      author: String! @proxyResolve(from: "parent.frontmatter.author")
      publishedAt: Date! @dateformat @proxyResolve(from: "parent.frontmatter.publishedAt")
      cats: [String]! @proxyResolve(from: "parent.frontmatter.cats")
      tags: [String] @proxyResolve(from: "parent.frontmatter.tags")
      blurb: String @proxyResolve(from: "parent.frontmatter.blurb")
      body: String! @proxyResolve(from: "parent.body")
      lastUpdated: Date! @dateformat @proxyResolve(from: "parent.frontmatter.lastUpdated")
    }
    type Book implements Node & MdxBook @dontInfer @childOf(type: "Mdx") {
      id: ID!
      slug: String! @proxyResolve(from: "parent.slug")
      title: String! @proxyResolve(from: "parent.frontmatter.title")
      author: String! @proxyResolve(from: "parent.frontmatter.author")
      publishedAt: Date! @dateformat @proxyResolve(from: "parent.frontmatter.publishedAt")
      languages: [String]! @proxyResolve(from: "parent.frontmatter.languages")
      audience: String! @proxyResolve(from: "parent.frontmatter.audience")
      genres: [String]! @proxyResolve(from: "parent.frontmatter.genres")
      tags: [String] @proxyResolve(from: "parent.frontmatter.tags")
      blurb: String @proxyResolve(from: "parent.frontmatter.blurb")
      body: String! @proxyResolve(from: "parent.body")
      lastUpdated: Date! @dateformat @proxyResolve(from: "parent.frontmatter.lastUpdated")
    }
    type Author implements Node & MdxAuthor @dontInfer @childOf(type: "Mdx") {
      id: ID!
      slug: String! @proxyResolve(from: "parent.slug")
      name: String! @proxyResolve(from: "parent.frontmatter.name")
      user: String! @proxyResolve(from: "parent.frontmatter.user")
      joined: Date! @dateformat @proxyResolve(from: "parent.frontmatter.joined")
      social: [String] @proxyResolve(from: "parent.frontmatter.social")
      blurb: String @proxyResolve(from: "parent.frontmatter.blurb")
      body: String! @proxyResolve(from: "parent.body")
      lastUpdated: Date! @dateformat @proxyResolve(from: "parent.frontmatter.lastUpdated")
    }
    `,
  ])
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  if (node.internal.type !== "Mdx") {
    return
  }

  const parent = getNode(node.parent)

  if (parent.sourceInstanceName === "post") {
    actions.createNode({
      id: createNodeId(`Post-${node.id}`),
      parent: node.id,
      internal: {
        type: "Post",
        contentDigest: node.internal.contentDigest,
      },
    })
  }

  if (parent.sourceInstanceName === "book") {
    actions.createNode({
      id: createNodeId(`Book-${node.id}`),
      parent: node.id,
      internal: {
        type: "Book",
        contentDigest: node.internal.contentDigest,
      },
    })
  }

  if (parent.sourceInstanceName === "author") {
    actions.createNode({
      id: createNodeId(`Author-${node.id}`),
      parent: node.id,
      internal: {
        type: "Author",
        contentDigest: node.internal.contentDigest,
      },
    })
  }
}

// // Create META for MDX Pages
// const regexAuthors = /^authors\/(?!index).+?.mdx/g
// const regexBooks = /^(books\/)((?!chapter(s\b|\b)).)*(\/index.mdx)$/g
// const regexChapters = /^(books\/)(.+?\/)(chapter(s\b|\b)-\d*.mdx)/g
// const regexBlog = /^blog\/index.mdx/g
// const regexPosts = /^blog\/.+?.mdx/g
// const { createFilePath } = require("gatsby-source-filesystem")

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   // Select only /src/pages/**/*.mdx
//   if (node.relativePath && node.sourceInstanceName === "pages") {
//     // --- Author Pages ---
//     if (node.relativePath.match(regexAuthors)) {
//       const slug = createFilePath({ node, getNode })

//       createNodeField({
//         name: "type",
//         node,
//         value: `author`,
//       })
//       createNodeField({
//         name: "slug",
//         node,
//         value: `${slug}`,
//       })

//       // --- Book Pages ---
//     } else if (node.relativePath.match(regexBooks)) {
//       const slug = createFilePath({ node, getNode })
//       const book = node.relativePath.replace("books/", "").replace(/\/.*/g, "")

//       createNodeField({
//         name: "type",
//         node,
//         value: `book`,
//       })
//       createNodeField({
//         name: "slug",
//         node,
//         value: `${slug}`,
//       })
//       createNodeField({
//         name: "book",
//         node,
//         value: `${book}`,
//       })

//       // --- Chapter Pages ---
//     } else if (node.relativePath.match(regexChapters)) {
//       const slug = createFilePath({ node, getNode })
//       const book = node.relativePath.replace("books/", "").replace(/\/.*/g, "")
//       const chapter = node.relativePath
//         .replace(/^(books\/)(.+?\/)(chapter(s\b|\b)-)/g, "")
//         .replace(/.mdx/g, "")

//       createNodeField({
//         name: "type",
//         node,
//         value: `chapter`,
//       })
//       createNodeField({
//         name: "slug",
//         node,
//         value: `${slug}`,
//       })
//       createNodeField({
//         name: "chapter",
//         node,
//         value: `${chapter}`,
//       })
//       createNodeField({
//         name: "book",
//         node,
//         value: `${book}`,
//       })

//       // --- Blog Page ---
//     } else if (node.relativePath.match(regexBlog)) {
//       const slug = createFilePath({ node, getNode })

//       createNodeField({
//         name: "type",
//         node,
//         value: `blog`,
//       })
//       createNodeField({
//         name: "slug",
//         node,
//         value: `${slug}`,
//       })

//       // --- Blog Posts ---
//     } else if (node.relativePath.match(regexPosts)) {
//       const slug = createFilePath({ node, getNode })

//       createNodeField({
//         name: "type",
//         node,
//         value: `post`,
//       })
//       createNodeField({
//         name: "slug",
//         node,
//         value: `${slug}`,
//       })

//       // --- Underpages ---
//     } else {
//       const slug = createFilePath({ node, getNode })

//       createNodeField({
//         name: "type",
//         node,
//         value: `underpage`,
//       })
//       createNodeField({
//         name: "slug",
//         node,
//         value: `${slug}`,
//       })
//     }
//   }
// }

// Build pages
const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // ------------------
  // Create Posts
  // ------------------
  let queryPosts = await graphql(`
    query {
      allMdxPost {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)
  if (queryPosts.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "Blog" query')
  }

  const posts = queryPosts.data.allMdxPost.edges

  posts.forEach(({ node }, index) => {
    const template = path.resolve(`./src/templates/Post.js`)

    createPage({
      path: `blog/` + node.slug, // create on query level
      component: template,
      context: { id: node.id },
    })
  })

  // ------------------
  // Create Books
  // ------------------
  let queryBooks = await graphql(`
    query {
      allMdxBook {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)
  if (queryBooks.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "Books" query')
  }

  const books = queryBooks.data.allMdxBook.edges

  books.forEach(({ node }, index) => {
    const template = path.resolve(`./src/templates/Book.js`)

    createPage({
      path: `library/` + node.slug, // create on query level
      component: template,
      context: { id: node.id },
    })
  })

  // ------------------
  // Create Books
  // ------------------
  let queryAuthors = await graphql(`
    query {
      allMdxAuthor {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)
  if (queryAuthors.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "Authors" query')
  }

  const authors = queryAuthors.data.allMdxAuthor.edges

  authors.forEach(({ node }, index) => {
    const template = path.resolve(`./src/templates/Author.js`)

    createPage({
      path: `authors/` + node.slug, // create on query level
      component: template,
      context: { id: node.id },
    })
  })

  //   // ------------------
  //   // Create Authors
  //   // ------------------
  //   let queryAuthors = await graphql(`
  //     query {
  //       allFile(filter: { fields: { type: { eq: "author" } } }) {
  //         edges {
  //           node {
  //             id
  //             fields {
  //               slug
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `)
  //   if (queryAuthors.errors) {
  //     reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  //   }

  //   const authors = queryAuthors.data.allFile.edges

  //   authors.forEach(({ node }, index) => {
  //     const slug = node.fields.slug
  //     const template = path.resolve(`./src/templates/Authors/Author.js`)

  //     createPage({
  //       path: slug,
  //       component: template,
  //       context: { id: node.id },
  //     })
  //   })

  //   // ------------------
  //   // Create Books & Pages
  //   // ------------------
  //   let queryBooks = await graphql(`
  //     query {
  //       allFile(filter: { fields: { type: { eq: "book" } } }) {
  //         edges {
  //           node {
  //             id
  //             fields {
  //               slug
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `)
  //   if (queryBooks.errors) {
  //     reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  //   }

  //   const books = queryBooks.data.allFile.edges

  //   books.forEach(({ node }, index) => {
  //     const slug = node.fields.slug
  //     const templateBook = path.resolve(`./src/templates/Books/Book/Book.js`)
  //     const templateBookContents = path.resolve(
  //       `./src/templates/Books/Book/Contents.js`
  //     )

  //     // About
  //     createPage({
  //       path: slug,
  //       component: templateBook,
  //       context: { id: node.id },
  //     })

  //     // Contents
  //     createPage({
  //       path: slug + "contents/",
  //       component: templateBookContents,
  //       context: { id: node.id },
  //     })
  //   })

  //   // ------------------
  //   // Create Book Chapters
  //   // ------------------
  //   let queryBookChapters = await graphql(`
  //     query {
  //       allFile(filter: { fields: { type: { eq: "chapter" } } }) {
  //         edges {
  //           node {
  //             id
  //             fields {
  //               slug
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `)
  //   if (queryBookChapters.errors) {
  //     reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  //   }

  //   const chapters = queryBookChapters.data.allFile.edges

  //   chapters.forEach(({ node }, index) => {
  //     const slug = node.fields.slug
  //     const template = path.resolve(`./src/templates/Books/Book/Chapter.js`)

  //     createPage({
  //       path: slug,
  //       component: template,
  //       context: { id: node.id },
  //     })
  //   })

  //   // ------------------
  //   // Create Blog
  //   // ------------------
  //   let queryBlog = await graphql(`
  //     query {
  //       file(fields: { type: { eq: "blog" } }) {
  //         id
  //         fields {
  //           slug
  //         }
  //       }
  //     }
  //   `)
  //   if (queryBlog.errors) {
  //     reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  //   }

  //   const blog = queryBlog.data.file
  //   console.log("blog", blog)
  //   const slug = blog.fields.slug
  //   const template = path.resolve(`./src/templates/Blog/Blog.js`)

  //   createPage({
  //     path: slug,
  //     component: template,
  //     context: { id: blog.id },
  //   })

  // // ------------------
  // // Create Underpages
  // // ------------------
  // let queryPages = await graphql(`
  //   query {
  //     allFile(filter: { fields: { type: { eq: "underpage" } } }) {
  //       edges {
  //         node {
  //           id
  //           fields {
  //             slug
  //           }
  //         }
  //       }
  //     }
  //   }
  // `)
  // if (queryPages.errors) {
  //   reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  // }

  // const pages = queryPages.data.allFile.edges

  // pages.forEach(({ node }, index) => {
  //   const slug = node.fields.slug
  //   const template = path.resolve(`./src/templates/Underpage.js`)

  //   createPage({
  //     path: slug,
  //     component: template,
  //     context: { id: node.id },
  //   })
  // })
}
