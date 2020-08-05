import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Link } from "gatsby"

const ChaptersSidebarTitle = ({ book }) => {
  const data = useStaticQuery(graphql`
    {
      allFile(filter: { fields: { type: { eq: "book" } } }) {
        edges {
          node {
            childMdx {
              frontmatter {
                slug
                title
                author
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  let bookSlug
  let bookTitle
  let bookAuthor

  data.allFile.edges.forEach(({ node }) => {
    const { slug, title, author } = node.childMdx.frontmatter

    if (book === slug) {
      bookSlug = node.fields.slug
      bookTitle = title
      bookAuthor = author
    }
  })

  return (
    <header className="px-4">
      <Link to={bookSlug} className="no-underline">
        <h2 className="font-black text-2xl leading-none m-0">{bookTitle}</h2>
      </Link>
      <p className="mt-2">by {bookAuthor}</p>
    </header>
  )
}

export default ChaptersSidebarTitle
