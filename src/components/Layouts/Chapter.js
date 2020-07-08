import React from "react"

export default function LayoutChapter({ data, children }) {
  return (
    <div id="LayoutChapter">
      <h1>Layout Chapter</h1>
      <hr />

      {children}
    </div>
  )
}
