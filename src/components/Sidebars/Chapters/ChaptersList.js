import React from "react"

import ChaptersListItem from "./ChaptersListItem"

import { FaBookmark } from "react-icons/fa"

const ChaptersList = props => {
  const { chapters, location } = props

  return (
    <menu className="flex-1 max-w-full h-32 sm:h-auto m-0 mt-8 p-0 pb-4 border-t-3 border-b-3 border-gray-700 overflow-y-auto">
      {chapters && (
        <div className="mt-4">
          <h3 className="px-4 uppercase tracking-widest">
            Chapters <FaBookmark className="float-right" />
          </h3>

          <ul className="mt-4">
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
