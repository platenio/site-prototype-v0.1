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
  const { id, body, frontmatter } = data.file.childMdx
  const {
    slug,
    title,
    author,
    blurb,
    features,
    date,
    published,
    last_updated,
  } = frontmatter

  return (
    <Layout>
      <div className="hidden mt-16 p-4 text-xs text-green-500 rounded bg-gray-900">
        <pre>{JSON.stringify(data, null, 4)}</pre>

        <hr className="my-8 border-gray-800" />

        <ul>
          <li>type: {pageContext.type}</li>
          <li>id: {id}</li>
          <hr className="my-8 border-gray-800" />
          <li>slug: {slug}</li>
          <li>title: {title}</li>

          {pageContext.type === "book" && (
            <li>
              <ul>
                <li>blurb: {blurb}</li>
                <li>author: {author}</li>
                <li>date: {date}</li>
                <li>features:</li>
                <ul className="list-decimal list-inside">
                  {features &&
                    features.map(function (feature) {
                      return <li>{feature}</li>
                    })}
                </ul>
                <li>published: {published}</li>
                <li>last updated: {last_updated}</li>
              </ul>
            </li>
          )}
        </ul>
      </div>
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Mdx2PageQuery($id: String) {
    file(id: { eq: $id }) {
      childMdx {
        id
        body
        frontmatter {
          slug
          title
          blurb
          author
          features
          date(formatString: "MMMM DD, YYYY")
          published(formatString: "MMMM DD, YYYY")
          last_updated(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`
