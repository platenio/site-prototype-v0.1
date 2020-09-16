import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import BookPage from "./BookPage"
import PageHeader from "../../../components/Layouts/PageHeader"

import "../../../styles/prose.css"
import { shortcodes } from "../../../components/Widgets/Widgets"

const BookChapter = ({ context, data, location }) => {
  const { chapter } = data.file.fields
  const { frontmatter, body } = data.file.childMdx
  const { title } = frontmatter

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
