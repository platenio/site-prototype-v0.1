import React from "react"
import { graphql } from "gatsby"

// Layout
import Layout from "../components/Layout"
import MDXTemplate from "../components/MDXTemplate/MDXTemplate"

export default function IndexPage({ data: { mdx } }) {
  return (
    <Layout>
      <MDXTemplate mdx={mdx} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexPageQuery {
    mdx(fields: { slug: { eq: "/" } }) {
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
