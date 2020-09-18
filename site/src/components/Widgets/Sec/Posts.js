import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
// import Img from "gatsby-image"

import "../../../styles/prose.css"

const SecPosts = () => {
  const data = useStaticQuery(graphql`
    {
      allFile(
        filter: { fields: { type: { eq: "post" } } }
        sort: { fields: childMdx___frontmatter___title }
      ) {
        edges {
          node {
            fields {
              slug
            }
            childMdx {
              excerpt
              frontmatter {
                title
              }
            }
          }
        }
      }
    }
  `)

  return (
    <section className="bg-gray-200 p-8 -mx-8">
      <ul
        className="grid gap-8 list-none mx-auto max-w-typo"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {data.allFile.edges.map(({ node }, i) => {
          const { excerpt, frontmatter } = node.childMdx
          const { title } = frontmatter
          const { slug } = node.fields

          return (
            <li key={i} className="p-0 m-0">
              <article>
                <div className="prose mt-2">
                  <h3 className="m-0">
                    <Link to={slug} className="no-underline">
                      {title}
                    </Link>
                  </h3>

                  <p>{excerpt}</p>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default SecPosts
