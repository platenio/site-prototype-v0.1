import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Link } from "gatsby"

import { FaBookmark } from "react-icons/fa"

const ChaptersSidebar = () => {
  // (filter: { fields: { type: { eq: "book" } } })
  const data = useStaticQuery(graphql`
    {
      allFile(sort: { fields: fields___chapter }) {
        edges {
          node {
            fields {
              slug
              type
              book
              chapter
            }
            childMdx {
              frontmatter {
                title
              }
            }
          }
        }
      }
    }
  `)

  const files = data.allFile.edges
  let books = []
  let pages = []
  let chapters = []

  {
    files.map(({ node }) => {
      if (node.fields) {
        const { type } = node.fields
        type === "book" && books.push(node)
        type === "page" && pages.push(node)
        type === "chapter" && chapters.push(node)
      }
    })
  }

  return (
    <div
      id="ChaptersSidebar"
      className="flex flex-wrap flex-col justify-start content-start h-full pt-8"
    >
      <menu className="flex-1 max-w-full h-32 sm:h-auto m-0 px-0 pb-2 border-b-3 border-gray-900 overflow-auto">
        <h3>
          Chapters <FaBookmark className="float-right" />
        </h3>

        <ul className="mt-2 pt-2 border-t-3 border-gray-900">
          {chapters.map(bookChapter => {
            if (bookChapter.fields.book === "platen") {
              const { slug, chapter } = bookChapter.fields
              const { title } = bookChapter.childMdx.frontmatter
              let chapterNum = ("0" + chapter).slice(-2)

              return (
                <li>
                  <Link
                    className="block px-2 py-2 text-lg no-underline hover:bg-gray-200"
                    activeClassName="text-white bg-gray-900 hover:bg-gray-800 hover:text-white"
                    to={slug}
                  >
                    <span className="font-black text-gray-500">
                      {chapterNum}
                    </span>{" "}
                    {title}
                  </Link>
                </li>
              )
            }
          })}
        </ul>
      </menu>

      <footer className="w-full px-2 py-2">
        <p className="text-xs m-0">
          <a href="https://www.platen.io" target="_blank" rel="noreferrer">
            Powered by Platen.io v1.0
          </a>
        </p>
      </footer>
    </div>
  )
}

export default ChaptersSidebar

{
  /*  */
}
