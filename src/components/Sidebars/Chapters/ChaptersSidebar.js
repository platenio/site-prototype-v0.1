import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import ChaptersSidebarTitle from "./ChaptersSidebarTitle"
import ChaptersList from "./ChaptersList"

const ChaptersSidebar = ({ location }) => {
  const data = useStaticQuery(graphql`
    {
      allFile(sort: { fields: fields___chapter }) {
        edges {
          node {
            id
            fields {
              slug
              type
              book
              chapter
            }
            childMdx {
              mdxAST
              frontmatter {
                slug
                title
                author
              }
            }
          }
        }
      }
    }
  `)
  const { pathname } = location
  const files = data.allFile.edges

  let curBook = false
  let curBookChapters = []

  // Get current book title
  // & Create chapters list based on current book
  files.forEach(({ node }) => {
    if (node.fields) {
      const book = node.fields.book
      const pathRegex = new RegExp("^/books/" + book + "/", "g")

      if (book) {
        if (pathname.match(pathRegex)) {
          // Find current book
          if (node.fields.type === "book") {
            curBook = node
          }

          // Find current book chapters
          if (node.fields.type === "chapter") {
            curBookChapters.push(node)
          }
        }
      }
    }
  })

  return (
    <div
      id="ChaptersSidebar"
      className="flex flex-wrap flex-col justify-start content-start h-full pt-8"
    >
      <ChaptersSidebarTitle book={curBook} />

      <ChaptersList chapters={curBookChapters} location={location} />

      <footer className="w-full px-4 py-2">
        <p className="text-xs text-right m-0">
          <a
            className="no-underline"
            href="https://www.platen.io"
            target="_blank"
            rel="noreferrer"
          >
            Powered by Platen.io v0.1
          </a>
        </p>
      </footer>
    </div>
  )
}

export default ChaptersSidebar
