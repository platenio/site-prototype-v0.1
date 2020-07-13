import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Link } from "gatsby"

import { FaBookmark, FaPaperclip } from "react-icons/fa"

import ChaptersSidebarTitle from "./ChaptersSidebarTitle"

const ChaptersSidebar = ({ location, tableOfContents }) => {
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
  const { origin, pathname } = location

  const files = data.allFile.edges
  let curBook = ""
  let chapters = []

  files.forEach(({ node }) => {
    if (node.fields) {
      const book = node.fields.book

      if (book && node.fields.type === "chapter") {
        const pathRegex = new RegExp("^/books/" + book + "/", "g")
        if (pathname.match(pathRegex)) {
          curBook = book
          chapters.push(node)
        }
      }
    }
  })

  const markers = []
  tableOfContents.children.forEach((item, i) => {
    if (item.value) {
      const val = item.value
      const markerRegex = new RegExp("^<Marker", "g")
      const match = val.match(markerRegex)

      if (match) {
        const idRegex = new RegExp('id="(.+?)"', "g")
        const idMatch = idRegex.exec(val)
        const id = idMatch[1]
        const nextItem = tableOfContents.children[i + 1]

        if (nextItem.type === "heading") {
          let title = ""

          nextItem.children.forEach(item => {
            if (item.type === "text") {
              title += item.value
            }
          })
          markers.push({ id, title })
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

      <menu className="flex-1 max-w-full h-32 sm:h-auto m-0 px-0 mt-4 pb-2 border-b-3 border-gray-900 overflow-auto">
        {chapters && (
          <>
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
          </>
        )}

        {markers.length > 0 && (
          <>
            <h3>
              Clips <FaPaperclip className="float-right" />
            </h3>
            <ul className="mt-2 pt-2 border-t-3 border-gray-900">
              {markers.map(marker => {
                return (
                  <li>
                    <Link
                      className="btn-secondary text-left"
                      to={origin + pathname + "#clip-" + marker.id}
                    >
                      {marker.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </>
        )}
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
