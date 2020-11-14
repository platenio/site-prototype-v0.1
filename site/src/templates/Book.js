import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import "../styles/prose.css"

import Layout from "./Layout"
import PageHeader from "../components/Layouts/PageHeader"

import { shortcodes } from "../components/Widgets/Widgets"

const LayoutBook = ({ data }) => {
  const { book } = data

  return (
    <Layout //featureImg={featureImgSrc}
      sidebarLeft={false}
      sidebarRight={false}
    >
      <div className="mx-auto">
        <PageHeader>
          <h1 className="m-0">{book.name}</h1>
        </PageHeader>

        <div className="mt-8 prose">
          <p>id: {book.id}</p>
          <p>slug: {book.slug}</p>
          <p>author: {book.author}</p>
          <p>publishedAt: {book.publishedAt}</p>
          <p>languages</p>
          <ul>
            {book.languages.map((language, i) => {
              return <li key={i}>{language}</li>
            })}
          </ul>
          <p>genres</p>
          <ul>
            {book.genres.map((genre, i) => {
              return <li key={i}>{genre}</li>
            })}
          </ul>
          <p>tags</p>
          <ul>
            {book.tags.map((tag, i) => {
              return <li key={i}>{tag}</li>
            })}
          </ul>
          <p>blurb: {book.blurb}</p>
          <p>lastUpdated: {book.lastUpdated}</p>

          <MDXProvider components={shortcodes}>
            <MDXRenderer>{data.book.body}</MDXRenderer>
          </MDXProvider>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query bookQuery($id: String) {
    book(id: { eq: $id }) {
      id
      slug
      title
      author
      publishedAt
      languages
      genres
      tags
      blurb
      body
      lastUpdated
    }
  }
`

export default LayoutBook
