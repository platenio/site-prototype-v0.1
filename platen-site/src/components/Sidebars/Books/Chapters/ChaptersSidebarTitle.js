import React from "react"
import { Link } from "gatsby"

const ChaptersSidebarTitle = ({ book }) => {
  const { title, author } = book.childMdx.frontmatter
  const { slug } = book.fields

  return (
    <header className="px-4">
      <Link to={slug} className="no-underline">
        <h2 className="font-black text-2xl leading-none m-0">{title}</h2>
      </Link>
      <p className="mt-2">by {author}</p>
    </header>
  )
}

export default ChaptersSidebarTitle
