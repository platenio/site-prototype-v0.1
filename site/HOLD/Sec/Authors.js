import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

const SecAuthors = () => {
  const data = useStaticQuery(graphql`
    {
      allFile(
        filter: { fields: { type: { eq: "author" } } }
        sort: { fields: childMdx___frontmatter___title }
      ) {
        edges {
          node {
            fields {
              slug
            }
            childMdx {
              frontmatter {
                title
                avatar {
                  childImageSharp {
                    fluid(maxWidth: 250, maxHeight: 250) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <section className="bg-gray-100 p-8 -mx-8">
      <ul
        className="grid gap-8 list-none mx-auto max-w-typo"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        }}
      >
        {data.allFile.edges.map(({ node }, i) => {
          const { title, avatar } = node.childMdx.frontmatter
          const { slug } = node.fields

          return (
            <li key={i} className="p-0 m-0">
              <article>
                <div className="m-0 max-w-full w-64">
                  <Link
                    to={slug}
                    className="block no-underline rounded overflow-hidden shadow-xl"
                  >
                    {avatar && (
                      <Img
                        fluid={avatar.childImageSharp.fluid}
                        objectFit="cover"
                        objectPosition="50% 50%"
                        alt=""
                      />
                    )}
                  </Link>
                </div>
                <div className="mt-2 text-center">
                  <h3 className="m-0">
                    <Link to={slug} className="no-underline">
                      {title}
                    </Link>
                  </h3>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default SecAuthors
