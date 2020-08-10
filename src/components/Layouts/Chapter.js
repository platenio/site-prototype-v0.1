import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
// import tw, { styled } from "twin.macro"

// Layout
import Layout from "../Layout"
import PageHeader from "./PageHeader"
import ChaptersSidebar from "../Sidebars/Chapters/ChaptersSidebar"
import PlatenArray from "./PlatenArray"

// Shortcodes
// import * as FontAwesome from "react-icons/fa"
import Rolltable from "../Widgets/Rolltable/Rolltable"
import Clip from "../Widgets/Layout/Clip/Clip"
import Nest from "../Widgets/Layout/Nest/Nest"
import SecLibrary from "../Sections/Library/library"

// const Code = styled.pre`
//   ${tw`block p-4 text-xs font-fira-code font-light italic text-gray-700 bg-gray-400 border-3 border-gray-400 break-all whitespace-pre-wrap overflow-x-hidden`}

//   code::after {
//     display: none;
//   }
// `

const LayoutChapter = ({ context, data, location }) => {
  const { chapter } = data.file.fields
  const { frontmatter, body, mdxAST } = data.file.childMdx
  const { title, featureImg } = frontmatter
  const featureImgSrc = featureImg && featureImg.childImageSharp.fluid.src
  const shortcodes = {
    Rolltable: props => <Rolltable {...props} />,
    Clip: props => <Clip {...props} location={location} />,
    Nest: props => <Nest {...props} />,
    SecLibrary: props => <SecLibrary {...props} location={location} />,
    // code: Prism,
    // wrapper: ({ children, ...props }) => (
    //   <>
    //     {children.forEach(child => {
    //       console.log("child", child.props)
    //     })}
    //     <pre>{console.log(children)}</pre>
    //     {/* <pre>{JSON.stringify(children, null, 4)}</pre> */}
    //   </>
    // ),
    // pre: props => <Code {...props} />,
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
      <div className="prose mx-auto">
        <PageHeader>
          <h1 className="m-0">{title}</h1>
          <p className="m-0 uppercase tracking-widest">Chapter {chapter}</p>
        </PageHeader>

        <div className="mt-8 pb-32">
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </div>

        <PlatenArray />
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
