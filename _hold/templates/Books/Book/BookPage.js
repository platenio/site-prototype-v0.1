import React from "react"

import Layout from "../../Layout"
import ChaptersSidebar from "../../../components/Sidebars/Books/Chapters/ChaptersSidebar"

const BookPage = props => {
  let featureImgSrc
  let mdxAST

  if (props.data) {
    mdxAST = props.data.file.childMdx
    const { featureImg } = props.data.file.childMdx.frontmatter
    featureImgSrc = featureImg && featureImg.childImageSharp.fluid.src
  }

  return (
    <Layout
      featureImg={props.data && featureImgSrc}
      sidebarLeft={
        <ChaptersSidebar
          location={props.location}
          tableOfContents={props.data && mdxAST}
        />
      }
      sidebarRight={false}
    >
      <div className="prose mx-auto">{props.children}</div>
    </Layout>
  )
}

export default BookPage
