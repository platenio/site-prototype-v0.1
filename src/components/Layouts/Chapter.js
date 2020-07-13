import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../Layout"
import ChaptersSidebar from "../Sidebars/Chapters/ChaptersSidebar"
// import ActionsSidebar from "../ActionsSidebar/ActionsSidebar"

import "./Chapter.scss"

import Rolltable from "../Widgets/Rolltable/Rolltable"
import SectionMarker from "../Widgets/SectionMarker/SectionMarker"

const shortcodes = {
  Rolltable,
  SectionMarker,
}

const LayoutChapter = ({ context, data, location }) => {
  const { chapter } = data.file.fields
  const { frontmatter, body } = data.file.childMdx
  const { title, featureImg } = frontmatter
  const featureImgSrc = featureImg && featureImg.childImageSharp.fluid.src

  return (
    <Layout
      // get book feature image
      featureImg={featureImgSrc}
      sidebarLeft={<ChaptersSidebar pathname={location.pathname} />}
      sidebarRight={false}
    >
      <header
        className="w-full pb-4 border-b-3 border-gray-900"
        style={{ maxWidth: "400px" }}
      >
        <p>Chapter {chapter}</p>
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
  query chapterQuery($id: String) {
    file(id: { eq: $id }) {
      fields {
        chapter
      }
      childMdx {
        body
        frontmatter {
          title
          author
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

export default LayoutChapter
