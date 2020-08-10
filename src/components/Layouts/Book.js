import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import { FaArrowLeft, FaCheckSquare } from "react-icons/fa"

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
import PageHeader from "./PageHeader"
// import ChaptersSidebar from "../ChaptersSidebar/ChaptersSidebar"
// import ActionsSidebar from "../ActionsSidebar/ActionsSidebar"
import BookOverlay from "../../../content/admin/book-overlay.png"

import "../../Reset.scss"

const LayoutBook = ({ data }) => {
  const { slug } = data.file.fields
  const { body } = data.file.childMdx
  const {
    title,
    published,
    author,
    featureImg,
    blurb,
    features,
    meta,
  } = data.file.childMdx.frontmatter
  const featureImgSrc = featureImg.childImageSharp.fluid.src
  let metaArray = meta && Object.entries(meta)

  return (
    <Layout featureImg={featureImgSrc} sidebarLeft={false} sidebarRight={false}>
      <div id="LayoutBook" className="Reset pb-32">
        <PageHeader>
          <div className="flex justify-start items-stretch pt-2 pr-2 -mb-2 -ml-2">
            <div className="flex-1 mb-2 ml-2">
              <h1 className="m-0">{title}</h1>
            </div>
            <div className="mb-2 ml-2 text-sm">
              <p className="m-0">
                Published on <b>{published}</b>
              </p>
              <p className="m-0">
                Written by <b>{author}</b>
              </p>
            </div>
          </div>
        </PageHeader>

        <div className="flex flex-wrap justify-center items-end mt-4 -mb-4 -ml-4">
          <div className="flex-1 mb-4 ml-4">
            <Link
              to="/books/"
              title="Return to view all books"
              className="btn-primary table"
            >
              <FaArrowLeft className="text-xl" />
            </Link>
          </div>
          <div className="flex-initial mb-4 ml-4">
            <Link className="btn-primary" to={slug + `chapters/1/`}>
              Read
            </Link>
            {/* TODO: Book Sample */}
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-start pt-8 -mb-8 -ml-8">
          <div className="cover flex-initial mb-8 ml-8 w-64">
            <div className="relative rounded shadow-2xl overflow-hidden">
              <span
                className="absolute z-10 top-0 left-0 w-full h-full bg-repeat-y bg-contain"
                style={{ backgroundImage: `url(` + BookOverlay + `)` }}
              />
              <Img
                className="shadow-xl"
                objectFit="cover"
                objectPosition="50% 50%"
                fluid={featureImg.childImageSharp.fluid}
                alt=""
              />
            </div>
          </div>
          <div className="about flex-1 mb-8 ml-8">
            {blurb && (
              <div className="">
                <h3 className="text-xl font-bold">About</h3>
                <div className="text-lg mt-4">{blurb}</div>
              </div>
            )}

            {features && (
              <div className="mt-8">
                <h3 className="text-xl font-bold">Features</h3>

                <ul className="mt-4 grid grid-flow-row gap-2 text-lg">
                  {features.map((feature, i) => {
                    return (
                      <li
                        key={i}
                        className="flex justify-start items-start text-xl leading-none"
                      >
                        <div className="img mr-2">
                          <FaCheckSquare />
                        </div>
                        <div className="msg">{feature}</div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {meta && (
              <ul
                className="mt-8 grid grid-flow-cols gap-4 p-4 text-center bg-gray-200 rounded"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                }}
              >
                {metaArray.map(([key, value], i) => {
                  return (
                    <li key={i}>
                      <b className="block text-xl font-black">{value}</b>
                      <small className="uppercase text-xs">{key}</small>{" "}
                    </li>
                  )
                })}
              </ul>
            )}

            <div className="prose mt-8">
              <MDXProvider>
                <MDXRenderer>{body}</MDXRenderer>
              </MDXProvider>
            </div>
          </div>
        </div>
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
        body
        frontmatter {
          title
          blurb
          author
          features
          meta {
            ages
            chapters
            language
            pages
          }
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
