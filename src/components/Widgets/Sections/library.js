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
                    fluid {
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
    <section id="library" className="my-16 p-8 bg-gray-200 rounded-sm">
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
            <li className="flex-auto mb-4 ml-4 bg-white rounded shadow-md overflow-hidden">
              <article>
                <Link to={slug} className="no-underline">
                  <Img
                    fluid={featureImg.childImageSharp.fluid}
                    objectFit="cover"
                    objectPosition="50% 50%"
                    alt=""
                  />
                </Link>
                <div className="pb-8 p-4">
                  <h3>
                    <Link to={slug} className="no-underline">
                      {title}
                    </Link>
                  </h3>
                  <p>{blurb}</p>
                  <footer className="mt-4">
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
