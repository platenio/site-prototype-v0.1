import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import "../styles/prose.css"

import Layout from "./Layout"
import PageHeader from "../components/Layouts/PageHeader"

import { shortcodes } from "../components/Widgets/Widgets"

const LayoutAuthor = ({ data }) => {
  const { author } = data

  return (
    <Layout //featureImg={featureImgSrc}
      sidebarLeft={false}
      sidebarRight={false}
    >
      <div className="mx-auto">
        <PageHeader>
          <h1 className="m-0">{author.name}</h1>
        </PageHeader>

        <div className="mt-8 prose">
          <p>id: {author.id}</p>
          <p>slug: {author.slug}</p>
          <p>user: {author.user}</p>
          <p>joined: {author.joined}</p>
          <p>social</p>
          <ul>
            {author.social.map((url, i) => {
              return <li key={i}>{url}</li>
            })}
          </ul>
          <p>blurb: {author.blurb}</p>
          <p>lastUpdated: {author.lastUpdated}</p>

          <MDXProvider components={shortcodes}>
            <MDXRenderer>{data.author.body}</MDXRenderer>
          </MDXProvider>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query authorQuery($id: String) {
    author(id: { eq: $id }) {
      id
      slug
      name
      user
      joined
      social
      blurb
      body
      lastUpdated
    }
  }
`

export default LayoutAuthor
