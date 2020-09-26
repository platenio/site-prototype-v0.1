import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import "../styles/prose.css"

import Layout from "./Layout"
import PageHeader from "../components/Layouts/PageHeader"

import { shortcodes } from "../components/Widgets/Widgets"

const LayoutPost = ({ data }) => {
  const { post } = data

  return (
    <Layout //featureImg={featureImgSrc}
      sidebarLeft={false}
      sidebarRight={false}
    >
      <div className="mx-auto">
        <PageHeader>
          <h1 className="m-0">{post.title}</h1>
        </PageHeader>

        <div className="mt-8 prose">
          <p>id: {post.id}</p>
          <p>slug: {post.slug}</p>
          <p>blurb: {post.blurb}</p>
          <p>author: {post.author}</p>
          <p>publishedAt: {post.publishedAt}</p>
          <p>Cats</p>
          <ul>
            {post.cats.map((cat, i) => {
              return <li key={i}>{cat}</li>
            })}
          </ul>
          {post.tags && (
            <>
              <p>Tags</p>
              <ul>
                {post.tags.map((tag, i) => {
                  return <li key={i}>{tag}</li>
                })}
              </ul>
            </>
          )}
          <p>lastUpdated: {post.lastUpdated}</p>

          <MDXProvider components={shortcodes}>
            <MDXRenderer>{data.post.body}</MDXRenderer>
          </MDXProvider>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query postQuery($id: String) {
    post(id: { eq: $id }) {
      id
      slug
      title
      blurb
      author
      publishedAt
      cats
      tags
      body
      lastUpdated
    }
  }
`

export default LayoutPost
