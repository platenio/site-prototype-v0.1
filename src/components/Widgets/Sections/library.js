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
                tags
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
      <div className="mb-4 text-center">
        <h2>Author Library</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum error
          veniam quia unde sunt eligendi est voluptatum beatae ratione,
          exercitationem.
        </p>
      </div>

      <ul className="flex flex-wrap justify-center items-stretch pt-4 pr-4 -mb-4 -ml-4">
        {data.allFile.edges.map(({ node }) => {
          const {
            author,
            blurb,
            // date,
            // features,
            published,
            // tags,
            title,
            featureImg,
          } = node.childMdx.frontmatter
          const { slug } = node.fields

          return (
            <li
              className="flex-initial w-full mb-4 ml-4 bg-white border-3 border-gray-900"
              style={{ maxWidth: "600px" }}
            >
              <article className="flex justify-center items-stretch">
                <div className="flex-initial m-0 w-40">
                  <Link to={slug} className="no-underline">
                    <Img
                      fluid={featureImg.childImageSharp.fluid}
                      objectFit="cover"
                      objectPosition="50% 50%"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="flex-1 flex flex-wrap justify-start items-start w-32">
                  <div className="flex-initial w-full p-4">
                    <h3 className="text-2xl">
                      <Link to={slug} className="no-underline">
                        {title}
                      </Link>
                    </h3>
                    <p>{blurb}</p>
                  </div>
                  <footer className="flex-initial w-full p-4 mt-auto bg-gray-100">
                    {/* TODO: Fetch author meta */}
                    <img src="" alt="" />

                    <span className="text-xs">
                      <h4>{author}</h4>
                      <p className="m-0">{published}</p>
                    </span>
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
