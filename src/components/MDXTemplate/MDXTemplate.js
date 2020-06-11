import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

// Shortcodes
import { Link } from "gatsby"
import Rolltable from "../Rolltable/Rolltable"
const shortcodes = { Link, Rolltable }

export default function MDXTemplate({ mdx }) {
  return (
    <MDXProvider components={shortcodes}>
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </MDXProvider>
  )
}
