import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import "./HeaderLinks.css"

const HeaderLinks = props => {
  const data = useStaticQuery(graphql`
    {
      file(sourceInstanceName: { eq: "globals" }, name: { eq: "main-nav" }) {
        childMdx {
          body
        }
      }
    }
  `)

  const components = {
    a: props => (
      <Link
        {...props}
        to={props.href}
        tabIndex="0"
        className="btn-ghost"
        activeClassName="active"
      />
    ),
    wrapper: props => <menu id="header-links" {...props} />,
  }

  return (
    <MDXProvider components={components}>
      <MDXRenderer>{data.file.childMdx.body}</MDXRenderer>
    </MDXProvider>
  )
}

export default HeaderLinks
