import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Link } from "gatsby"

import { FaBookmark } from "react-icons/fa"

import ChaptersSidebarTitle from "./ChaptersSidebarTitle"

const ChaptersSidebar = ({ pathname }) => {
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
  let curBook = ""
  let chapters = []

  files.forEach(({ node }) => {
    if (node.fields) {
      curBook = node.fields.book

      if (curBook && node.fields.type === "chapter") {
        const pathRegex = new RegExp("^/books/" + curBook + "/", "g")
        pathname.match(pathRegex) && chapters.push(node)
      }
    }
  })

  return (
    <div
      id="ChaptersSidebar"
      className="flex flex-wrap flex-col justify-start content-start h-full pt-8"
    >
      <ChaptersSidebarTitle book={curBook} />

      <menu className="flex-1 max-w-full h-32 sm:h-auto m-0 px-0 mt-4 pb-2 border-b-3 border-gray-900 overflow-auto">
        <h3>
          Index <FaBookmark className="float-right" />
        </h3>
        <ul className="mt-2 pt-2 border-t-3 border-gray-900">
          {chapters.map(element => {
            const { title } = element.childMdx.frontmatter
            const { slug, chapter } = element.fields
            let chapterNum = ("0" + chapter).slice(-2)

            return (
              <li key={element.id}>
                <Link
                  to={slug}
                  className="btn-secondary text-left"
                  activeClassName="active"
                >
                  {chapterNum} <span className="font-bold">{title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </menu>

      <footer className="w-full px-2 py-2">
        <p className="text-xs m-0">
          <a
            className="text-gray-900 no-underline"
            href="https://www.platen.io"
            target="_blank"
            rel="noreferrer"
          >
            Powered by Platen.io v1.0
          </a>
        </p>
      </footer>
    </div>
  )
}

export default ChaptersSidebar
