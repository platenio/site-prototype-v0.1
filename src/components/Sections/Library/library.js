import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

import "../../../Reset.scss"
import BookOverlay from "../../../../content/admin/book-overlay.png"

const SecLibrary = () => {
  const data = useStaticQuery(graphql`
    {
      allFile(
        filter: { fields: { type: { eq: "book" } } }
        sort: { fields: childMdx___frontmatter___title }
      ) {
        edges {
          node {
            fields {
              slug
              book
            }
            childMdx {
              frontmatter {
                author
                blurb
                date(formatString: "MMMM DD, YYYY")
                features
                published(formatString: "MMMM DD, YYYY")
                title
                featureImg {
                  childImageSharp {
                    fluid(maxWidth: 267, maxHeight: 427) {
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
    <section id="library" className="Reset bg-gray-200 p-8 -mx-8">
      <ul
        className="grid gap-8 list-none mx-auto max-w-typo"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        }}
      >
        {data.allFile.edges.map(({ node }, i) => {
          const {
            author,
            // blurb,
            // date,
            // features,
            // published,
            title,
            featureImg,
          } = node.childMdx.frontmatter
          const { slug } = node.fields

          return (
            <li key={i} className="p-0 m-0">
              <article>
                <div className="m-0 max-w-full w-64">
                  <Link
                    to={slug}
                    className="relative block no-underline h-full rounded shadow-lg overflow-hidden"
                  >
                    <span
                      className="absolute z-10 top-0 left-0 w-full h-full bg-repeat-y bg-contain"
                      style={{ backgroundImage: `url(` + BookOverlay + `)` }}
                    />
                    <Img
                      // className="h-full"
                      className="shadow-xl"
                      fluid={featureImg.childImageSharp.fluid}
                      objectFit="cover"
                      objectPosition="50% 50%"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="mt-2">
                  <h3 className="m-0">
                    <Link to={slug} className="no-underline">
                      {title}
                    </Link>
                  </h3>
                  <p className="m-0 text-xs">by {author}</p>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default SecLibrary
