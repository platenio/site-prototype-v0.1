import React from "react"
// import { Link } from "gatsby"

import "../../styles/prose.css"

import PlatenArray from "./PlatenArray"

const PageHeader = ({ children }) => {
  return (
    <header className="pb-4 prose">
      {children}

      <div className="mt-2">
        <PlatenArray />
      </div>
    </header>
  )
}

export default PageHeader
