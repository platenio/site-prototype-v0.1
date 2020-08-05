import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

import "../../../Reset.scss"

const SecLibrary = () => {
  const data = useStaticQuery(graphql`
    {
      allFile(filter: { fields: { type: { eq: "book" } } }) {
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
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        }}
      >
        {data.allFile.edges.map(({ node }) => {
          const {
            author,
            blurb,
            // date,
            // features,
            published,
            title,
            featureImg,
          } = node.childMdx.frontmatter
          const { slug } = node.fields

          return (
            <li className="p-0 m-0">
              <article className="flex justify-start items-stretch h-full">
                <div className="flex-initial m-0 max-w-full w-32">
                  <Link to={slug} className="block no-underline h-full">
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
                <div className="flex-1 flex flex-wrap justify-start items-start">
                  <div className="flex-0 w-full px-4">
                    <h3 className="m-0 text-2xl">
                      <Link to={slug} className="no-underline">
                        {title}
                      </Link>
                    </h3>
                    <p className="m-0 text-xs">by {author}</p>
                    <p className="mt-0 text-xs">{published}</p>

                    <p>{blurb}</p>
                  </div>
                  <footer className="flex-initial w-full mt-auto">
                    <div className="px-4">
                      <Link to={slug} className="btn-primary text-sm table">
                        Learn More
                      </Link>
                    </div>
                  </footer>
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
