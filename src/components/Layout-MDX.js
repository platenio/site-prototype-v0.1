import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

// Layout
import "./Layout.scss"
import Layout from "./Layout"

// Shortcodes
import { Link } from "gatsby"
import Rolltable from "./Widgets/Rolltable/Rolltable"
import ParentComponent from "./Widgets/Test/Test"
const shortcodes = {
  Link,
  Rolltable,
  ParentComponent,
}

export default function MdxLayout({ data: { mdx } }) {
  return (
    <Layout>
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Mdx2PageQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        path
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
