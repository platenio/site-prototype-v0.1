import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import tw, { styled } from "twin.macro"

// Layout
import Layout from "../Layout"
import ChaptersSidebar from "../Sidebars/Chapters/ChaptersSidebar"

// Shortcodes
// import * as FontAwesome from "react-icons/fa"
import Rolltable from "../Widgets/Rolltable/Rolltable"
import Clip from "../Widgets/Clip/Clip"
import SecLibrary from "../Sections/Library/library"

// Styles
const Header = styled.div`
  ${tw`w-full border-b-3 border-gray-900`}

  p {
    ${tw`m-0 uppercase tracking-widest`}
  }
  h1 {
    ${tw`text-3xl leading-none`}
  }
`
const MDXContent = styled.article`
  ${tw`pb-32 mx-auto`}

  // > .content {
  //   ${tw`prose lg:prose-xl`}
  // }

  pre {
    ${tw`block p-4 text-xs font-fira-code font-light italic text-gray-700 bg-gray-400 border-3 border-gray-400 break-all whitespace-pre-wrap overflow-x-hidden`}
  }
`

const LayoutChapter = ({ context, data, location }) => {
  const { chapter } = data.file.fields
  const { frontmatter, body, mdxAST } = data.file.childMdx
  const { title, featureImg } = frontmatter
  const featureImgSrc = featureImg && featureImg.childImageSharp.fluid.src
  const shortcodes = {
    Rolltable: props => <Rolltable {...props} />,
    Clip: props => <Clip {...props} location={location} />,
    SecLibrary: props => <SecLibrary {...props} location={location} />,
  }

  return (
    <Layout
      // get book feature image
      featureImg={featureImgSrc}
      sidebarLeft={
        <ChaptersSidebar location={location} tableOfContents={mdxAST} />
      }
      sidebarRight={false}
    >
      <Header>
        <p>Chapter {chapter}</p>
        <h1>{title}</h1>
      </Header>

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
        mdxAST
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
