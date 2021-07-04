// import { graphql, useStaticQuery } from "gatsby"

// export function BookChapters(location) {
//   const data = useStaticQuery(graphql`
//     {
//       allFile(sort: { fields: fields___chapter }) {
//         edges {
//           node {
//             id
//             fields {
//               slug
//               type
//               book
//               chapter
//             }
//             childMdx {
//               mdxAST
//               frontmatter {
//                 slug
//                 title
//                 blurb
//                 author
//               }
//             }
//           }
//         }
//       }
//     }
//   `)
//   const { pathname } = location
//   const files = data.allFile.edges

//   let curBook = false
//   let curBookChapters = []

//   // Get current book title
//   // & Create chapters list based on current book
//   files.forEach(({ node }) => {
//     if (node.fields) {
//       const book = node.fields.book
//       const pathRegex = new RegExp("^/books/" + book + "/", "g")

//       if (book) {
//         if (pathname.match(pathRegex)) {
//           // Find current book
//           if (node.fields.type === "book") {
//             curBook = node
//           }

//           // Find current book chapters
//           if (node.fields.type === "chapter") {
//             curBookChapters.push(node)
//           }
//         }
//       }
//     }
//   })

//   return { book: curBook, chapters: curBookChapters }
// }
