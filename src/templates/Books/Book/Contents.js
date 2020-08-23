import React from "react"
import { Link } from "gatsby"

import "../../../styles/prose.css"

import BookPage from "./BookPage"
import PageHeader from "../../../components/Layouts/PageHeader"

import { BookChapters } from "../../../queries/bookChapters"

const BookContents = ({ context, location }) => {
  const bookChapters = BookChapters(location)
  const { chapters } = bookChapters

  function ContentList() {
    const chaptersList = chapters.map(ch => {
      const { chapter, slug } = ch.fields
      const { title, blurb } = ch.childMdx.frontmatter
      const chapterPretty = ("0" + chapter).slice(-2)

      return (
        <li key={chapter} className="bg-gray-100">
          <p className="text-xs uppercase font-fira-code font-thin tracking-wides py-1 px-2 bg-gray-200">
            Chapter {chapterPretty}
          </p>

          <div className="prose py-4 px-2">
            <Link to={slug}>
              <h3>{title}</h3>
            </Link>

            {blurb && <p>{blurb}</p>}
          </div>
        </li>
      )
    })
    return (
      <ul
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {chaptersList}
      </ul>
    )
  }

  return (
    <BookPage location={location}>
      <PageHeader>
        <h1 className="m-0">Contents</h1>
      </PageHeader>

      <div className="mt-8 pb-32">
        <ContentList />
      </div>
    </BookPage>
  )
}

export default BookContents
