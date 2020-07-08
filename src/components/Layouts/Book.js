import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

export default function LayoutBook({
  slug,
  title,
  author,
  blurb,
  featureImg,
  children,
  published,
  features,
}) {
  return (
    <div id="LayoutBook" className="pb-32">
      <div className="w-full flex flex-wrap justify-center items-end pt-8 pr-8 -ml-8 -mb-8">
        <div className="flex-1 mb-8 ml-8">
          <h1 className="text-4xl">{title}</h1>

          <p className="mt-0 text-sm text-gray-600">by {author}</p>
        </div>
        <div className="flex-initial mb-8 ml-8">
          <Link className="btn-action" to={slug + `chapters/1/`}>
            Read
          </Link>
          {/* TODO: Book Sample */}
          {/* <Link className="btn-action-outline disabled" to="#">
            Sample
          </Link> */}
        </div>
      </div>

      <div className="w-full flex flex-wrap justify-center items-start pt-8 pr-8 -ml-8">
        <div className="cover flex-initial mb-8 ml-8 w-64">
          <Img
            className="shadow-lg"
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
                {features.map(feature => {
                  return (
                    <li className="py-2 px-4 border-2 border-gray-900">
                      {feature}
                    </li>
                  )
                })}
              </ul>
            </>
          )}

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

      {children}

      <hr />

      <p>Published {published}</p>
    </div>
  )
}
