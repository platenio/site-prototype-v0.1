import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

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
    <section id="library">
      <ul
        className="grid gap-8"
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
            <li>
              <article className="flex justify-start items-stretch h-full">
                <div className="flex-initial m-0 max-w-full w-32">
                  <Link to={slug} className="block no-underline h-full">
                    <Img
                      // className="h-full"
                      className="rounded shadow-xl"
                      fluid={featureImg.childImageSharp.fluid}
                      objectFit="cover"
                      objectPosition="50% 50%"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="flex-1 flex flex-wrap justify-start items-start">
                  <div className="flex-0 w-full px-4">
                    <h3 className="mt-0 text-2xl">
                      <Link to={slug} className="no-underline">
                        {title}
                      </Link>
                    </h3>
                    <p className="text-xs">by {author}</p>
                    <p className="mt-0 text-xs">published {published}</p>

                    <p>{blurb}</p>
                  </div>
                  <footer className="flex-initial w-full mt-auto">
                    <div className="px-4">
                      <hr className="border-gray-200" />

                      <Link to={slug} className="btn-primary table">
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
