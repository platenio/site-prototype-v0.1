import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import BookPage from "./BookPage"
import PageHeader from "../../../components/Layouts/PageHeader"

import "../../../styles/prose.css"

// import * as GameIcons from "react-icons/gi"
import Clip from "../../../components/Widgets/Clip"
import Nest from "../../../components/Widgets/Nest"
import Rolltable from "../../../components/Widgets/Rolltable/Rolltable"
import SecBooks from "../../../components/Widgets/Sec/Books"
import SecAuthors from "../../../components/Widgets/Sec/Authors"

const BookChapter = ({ context, data, location }) => {
  const { chapter } = data.file.fields
  const { frontmatter, body } = data.file.childMdx
  const { title } = frontmatter

  const shortcodes = {
    // GameIcons
    Clip: props => <Clip {...props} location={location} />,
    Nest: props => <Nest {...props} />,
    Rolltable: props => <Rolltable {...props} />,
    SecAuthors: props => <SecAuthors {...props} location={location} />,
    SecBooks: props => <SecBooks {...props} location={location} />,
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
    <BookPage data={data} location={location}>
      <PageHeader>
        <h1 className="m-0">{title}</h1>
        <p className="m-0 uppercase tracking-widest">Chapter {chapter}</p>
      </PageHeader>

      <div className="mt-8 pb-32 prose">
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </div>
    </BookPage>
  )
}

export const query = graphql`
  query bookChapterQuery($id: String) {
    file(id: { eq: $id }) {
      childMdx {
        slug
        body
        frontmatter {
          title
        }
      }
      fields {
        chapter
      }
    }
  }
`

export default BookChapter
