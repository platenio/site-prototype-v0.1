import React from "react"
import { graphql } from "gatsby"

// Layout
import "./layout.scss"
import Layout from "./Layout"
import MDXTemplate from "./MDXTemplate/MDXTemplate"

export default function MdxLayout({ data: { mdx } }) {
  return (
    <Layout>
      <MDXTemplate mdx={mdx} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query MdxPageQuery($id: String) {
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
