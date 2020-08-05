import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Link } from "gatsby"
import scrollTo from "gatsby-plugin-smoothscroll"

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
  const { pathname } = location

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

  // Create clips
  const clips = () => {
    let clipsList = []

    tableOfContents.children.forEach((item, i) => {
      if (item.value) {
        const val = item.value
        const regex = new RegExp("^<Clip", "g")
        const match = val.match(regex)

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
            clipsList.push({ id, title })
          }
        }
      }
    })

    return (
      <>
        {clipsList.length > 0 && (
          <ul className="bg-gray-800">
            {clipsList.map(clip => {
              return (
                <li>
                  <button
                    onClick={() => scrollTo("#clip-" + clip.id)}
                    className="btn-invert flex justify-start items-start w-full py-1 px-4 text-left text-xs font-fira-code"
                  >
                    <span className="flex-1">{clip.title}</span>
                    <FaPaperclip className="inline-block" />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </>
    )
  }

  return (
    <div
      id="ChaptersSidebar"
      className="flex flex-wrap flex-col justify-start content-start h-full pt-8"
    >
      <ChaptersSidebarTitle book={curBook} />

      <menu className="flex-1 max-w-full h-32 sm:h-auto m-0 mt-8 p-0 pb-4 border-t-3 border-b-3 border-gray-700 overflow-y-auto">
        {chapters && (
          <div className="mt-4">
            <h3 className="px-4 uppercase tracking-widest">
              Chapters <FaBookmark className="float-right" />
            </h3>
            <ul className="mt-4">
              {chapters.map(element => {
                const { title } = element.childMdx.frontmatter
                const { slug, chapter } = element.fields
                let chapterNum = ("0" + chapter).slice(-2)

                return (
                  <li key={element.id} className="">
                    <Link
                      to={slug}
                      className="btn-invert px-4 text-left flex justify-start items-start"
                      activeClassName="active"
                    >
                      <span className="flex-1 mr-1">{title}</span>
                      <span className="font-thin font-fira-code">
                        {chapterNum}
                      </span>
                    </Link>

                    {slug === pathname && clips()}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </menu>

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
