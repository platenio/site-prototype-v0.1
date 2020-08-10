import React from "react"
// import { Link } from "gatsby"

import PlatenArray from "./PlatenArray"

const PageHeader = ({ children }) => {
  return (
    <header className="pb-4 prose">
      {children}

      <PlatenArray />
    </header>
  )
}

export default PageHeader
