import React from "react"

import ChaptersSidebarTitle from "./ChaptersSidebarTitle"
import ChaptersList from "./ChaptersList"

import { BookChapters } from "../../../../queries/bookChapters"

const ChaptersSidebar = ({ location }) => {
  const bookChapters = BookChapters(location)
  const { book, chapters } = bookChapters
  const { slug } = book.fields

  return (
    <div
      id="ChaptersSidebar"
      className="flex flex-wrap flex-col justify-start content-start h-full pt-8"
    >
      <ChaptersSidebarTitle book={book} />

      <ChaptersList slug={slug} chapters={chapters} location={location} />

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
