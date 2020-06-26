import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Link } from "gatsby"

const Sidebar = () => {
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
      id="Sidebar"
      className="flex flex-wrap flex-col justify-start content-start h-full"
    >
      <div className="w-full pt-8 pb-2 px-2">
        <h1 className="m-0 text-4xl">
          Platen<span className="opacity-75">.io</span>
        </h1>
      </div>
      <menu className="flex-1 max-w-full m-0 px-0 py-2 overflow-auto border-t border-b border-white border-opacity-25">
        <ul>
          {pages.map(page => {
            console.log(page)

            const { slug } = page.fields
            const { title } = page.childMdx.frontmatter
            return (
              <li>
                <Link activeClassName="active-link" to={slug}>
                  {title}
                </Link>
              </li>
            )
          })}
        </ul>

        <h3>Read</h3>
        <ul>
          {books.map(book => {
            const { slug } = book.fields
            const { title } = book.childMdx.frontmatter
            return (
              <li>
                <Link activeClassName="active-link" to={slug}>
                  {title}
                </Link>
              </li>
            )
          })}
        </ul>

        <h3>Chapters</h3>
        <ul className="chapters">
          {chapters.map(bookChapter => {
            if (bookChapter.fields.book === "platen") {
              const { slug, chapter } = bookChapter.fields
              const { title } = bookChapter.childMdx.frontmatter
              return (
                <li className="mb-2">
                  <Link activeClassName="active-link" to={slug}>
                    <span className="uppercase text-sm">Chapter {chapter}</span>
                    <br /> <span className="font-bold">{title}</span>
                  </Link>
                </li>
              )
            }
          })}
        </ul>
      </menu>
      <footer className="w-full px-2 py-2">
        <p className="text-xs text-gray-500 m-0">
          <a href="https://www.platen.io" target="_blank" rel="noreferrer">
            Powered by Platen.io v1.0
          </a>
        </p>
      </footer>
    </div>
  )
}

export default Sidebar

{
  /*  */
}
