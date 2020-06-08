import React from "react"
import { MDXProvider } from "@mdx-js/react"
import Rolltable from "./rolltable"
import '../css/index.scss'

const shortcodes = { Rolltable }

export default function Layout({ children }) {
  return (
    <MDXProvider components={shortcodes}>{children}</MDXProvider>
  )
}
