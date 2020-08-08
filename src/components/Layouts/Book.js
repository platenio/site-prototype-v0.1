import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

// export default function LayoutBook({
//   slug,
//   title,
//   author,
//   blurb,
//   featureImg,
//   children,
//   published,
//   features,
// }) {
//   return (

//   )
// }

import Layout from "../Layout"
// import ChaptersSidebar from "../ChaptersSidebar/ChaptersSidebar"
// import ActionsSidebar from "../ActionsSidebar/ActionsSidebar"

import "../../Reset.scss"

const LayoutBook = ({ context, data, location }) => {
  const { slug } = data.file.fields
  const {
    title,
    published,
    author,
    featureImg,
    blurb,
    features,
  } = data.file.childMdx.frontmatter
  const featureImgSrc = featureImg.childImageSharp.fluid.src

  return (
    <Layout featureImg={featureImgSrc} sidebarLeft={false} sidebarRight={false}>
      <div id="LayoutBook" className="Reset pb-32">
        <header className="prose pb-4 border-b-3 border-gray-900">
          <h1 className="m-0">{title}</h1>
        </header>

        <div className="w-full flex flex-wrap justify-center items-end pt-8 pr-8 -ml-8 -mb-8">
          <div className="flex-1 mb-8 ml-8">
            <div className="text-sm">
              <p className="mt-0">Published {published}</p>
              <p className="mt-0">by {author}</p>
            </div>
          </div>
          <div className="flex-initial mb-8 ml-8">
            <Link className="btn-primary" to={slug + `chapters/1/`}>
              Read
            </Link>
            {/* TODO: Book Sample */}
          </div>
        </div>

        <div className="w-full flex flex-wrap justify-center items-start pt-8 pr-8 -ml-8">
          <div className="cover flex-initial mb-8 ml-8 w-64">
            <Img
              className="shadow-xl"
              objectFit="cover"
              objectPosition="50% 50%"
              fluid={featureImg.childImageSharp.fluid}
              alt=""
            />
          </div>
          <div className="about flex-1 mb-8 ml-8">
            <div className="py-4 text-xl">“ {blurb} ”</div>

            <hr />

            {features && (
              <>
                <ul className="mt-2 grid grid-flow-row gap-2 text-lg">
                  {features.map((feature, i) => {
                    return (
                      <li
                        key={i}
                        className="py-2 px-4 border-2 border-gray-900"
                      >
                        {feature}
                      </li>
                    )
                  })}
                </ul>
              </>
            )}

            {/* TODO: Make dynamic */}
            <ul className="mt-2 grid grid-flow-cols grid-cols-1 sm:grid-cols-2 gap-2 text-center">
              <li className="p-2 border-2 border-gray-900">
                <b className="block font-black text-lg">24</b> Chapters
              </li>
              <li className="p-2 border-2 border-gray-900">
                <b className="block font-black text-lg">248</b> Pages
              </li>
              <li className="p-2 border-2 border-gray-900">
                Ages <b className="block font-black text-lg">12+</b>
              </li>
              <li className="p-2 border-2 border-gray-900">
                Language <b className="block font-black text-lg">English</b>
              </li>
            </ul>
          </div>
        </div>

        {}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query bookQuery($id: String) {
    file(id: { eq: $id }) {
      fields {
        slug
        book
      }
      childMdx {
        id
        rawBody
        frontmatter {
          title
          blurb
          author
          features
          date(formatString: "MMMM DD, YYYY")
          published(formatString: "MMMM DD, YYYY")
          last_updated(formatString: "MMMM DD, YYYY")
          featureImg {
            childImageSharp {
              fluid(maxWidth: 1600, maxHeight: 2560) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export default LayoutBook
