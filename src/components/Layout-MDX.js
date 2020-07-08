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
import SectionMarker from "./SectionMarker"
import SecLibrary from "./Widgets/Sections/library"

const shortcodes = {
  Link,
  Rolltable,
  ParentComponent,
  SectionMarker,
  SecLibrary,
}

export default function MdxLayout({ pageContext, data }) {
  const { body } = data.file.childMdx

  return (
    <Layout context={pageContext} data={data}>
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Mdx2PageQuery($id: String) {
    file(id: { eq: $id }) {
      fields {
        slug
        book
      }
      childMdx {
        id
        body
        frontmatter {
          slug
          title
          blurb
          author
          tags
          features
          date(formatString: "MMMM DD, YYYY")
          published(formatString: "MMMM DD, YYYY")
          last_updated(formatString: "MMMM DD, YYYY")
          featureImg {
            childImageSharp {
              fluid(maxWidth: 1600, maxHeight: 2560) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
