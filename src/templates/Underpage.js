import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import "../styles/prose.css"

import Layout from "./Layout"
import PageHeader from "../components/Layouts/PageHeader"

import { Link } from "gatsby"
import SecBooks from "../components/Widgets/Sec/Books"
import SecAuthors from "../components/Widgets/Sec/Authors"

const LayoutUnderpage = ({ data }) => {
  const { frontmatter, body } = data.file.childMdx
  const { title, featureImg } = frontmatter
  const featureImgSrc = featureImg && featureImg.childImageSharp.fluid.src
  const shortcodes = {
    Link,
    SecAuthors,
    SecBooks,
  }

  return (
    <Layout featureImg={featureImgSrc} sidebarLeft={false} sidebarRight={false}>
      <div className="prosed mx-auto">
        <PageHeader>
          <h1 className="m-0">{title}</h1>
        </PageHeader>

        <div className="mt-8 prose">
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
        }
      }
    }
  }
`

export default LayoutUnderpage
