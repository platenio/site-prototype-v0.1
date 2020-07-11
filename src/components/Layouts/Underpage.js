import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../Layout"

// Shortcodes
import { Link } from "gatsby"
import SecLibrary from "../Sections/Library/library"

const shortcodes = {
  Link,
  SecLibrary,
}

const LayoutUnderpage = ({ context, data, location }) => {
  const { frontmatter, body } = data.file.childMdx
  const { title, featureImg } = frontmatter
  const featureImgSrc = featureImg && featureImg.childImageSharp.fluid.src

  return (
    <Layout featureImg={featureImgSrc} sidebarLeft={false} sidebarRight={false}>
      <header
        className="w-full pb-4 border-b-3 border-gray-900"
        style={{ maxWidth: "400px" }}
      >
        <h1 className="text-3xl leading-none">{title}</h1>
      </header>

      <div className="mt-8">
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query pageQuery($id: String) {
    file(id: { eq: $id }) {
      childMdx {
        body
        frontmatter {
          title
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

export default LayoutUnderpage
