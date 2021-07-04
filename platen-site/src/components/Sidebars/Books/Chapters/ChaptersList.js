import React from "react"
// import { Link } from "gatsby"

import ChaptersListItem from "./ChaptersListItem"

const ChaptersList = props => {
  const { slug, chapters, location } = props

  return (
    <menu className="flex-1 max-w-full h-32 sm:h-auto m-0 mt-8 p-0 pb-4 border-t-3 border-b-3 border-gray-700 overflow-y-auto">
      {chapters && (
        <div>
          {/* <h3 className="px-4 uppercase tracking-widest">
            Chapters <FaBookmark className="float-right" />
          </h3> */}

          <ul>
            {/* List Contents page */}
            <ChaptersListItem slug={slug + "contents/"} location={location} />

            {/* List Chapters */}
            {chapters.map((ch, i) => {
              return (
                <ChaptersListItem
                  key={i}
                  chapter={ch}
                  chapters={chapters}
                  location={location}
                />
              )
            })}
          </ul>
        </div>
      )}
    </menu>
  )
}

export default ChaptersList
