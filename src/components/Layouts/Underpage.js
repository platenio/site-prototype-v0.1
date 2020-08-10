import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
// import * as GameIcons from "react-icons/gi"

import Layout from "../Layout"
import PageHeader from "./PageHeader"

// Shortcodes
import { Link } from "gatsby"
import SecLibrary from "../Sections/Library/library"

const LayoutUnderpage = ({ data }) => {
  const { frontmatter, body } = data.file.childMdx
  const { title, featureImg } = frontmatter
  const featureImgSrc = featureImg && featureImg.childImageSharp.fluid.src
  const shortcodes = {
    // GameIcons,
    Link,
    SecLibrary,
  }

  return (
    <Layout featureImg={featureImgSrc} sidebarLeft={false} sidebarRight={false}>
      <div className="prose mx-auto">
        <PageHeader>
          <h1 className="m-0">{title}</h1>
        </PageHeader>

        <div className="mt-8">
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </div>
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
