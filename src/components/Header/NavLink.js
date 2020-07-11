import React, { Component } from "react"
import { graphql, StaticQuery } from "gatsby"
import { Link } from "gatsby"

class NavLinkBase extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pageID: false,
      pageSlug: false,
      pageTitle: false,
    }
  }

  componentDidMount() {
    let pageID, pageSlug, pageTitle
    const pages = this.props.data.allFile.edges

    pages.forEach(({ node }) => {
      pageSlug = node.fields.slug

      if (this.props.path === pageSlug) {
        pageID = node.id
        this.props.title
          ? (pageTitle = this.props.title)
          : (pageTitle = node.childMdx.frontmatter.title)

        this.setState({ pageID: pageID })
        this.setState({ pageSlug: pageSlug })
        this.setState({ pageTitle: pageTitle })
      }
    })
  }

  render() {
    return (
      <li>
        {this.state.pageID ? (
          <Link
            tabIndex="0"
            className="page-link"
            activeClassName="page-link-active"
            id={this.state.pageID}
            to={this.state.pageSlug}
          >
            {this.state.pageTitle}
          </Link>
        ) : (
          <span className="fake-link bg-red-500">Invalid</span>
        )}
      </li>
    )
  }
}

const NavLink = ({ path, title }) => (
  <StaticQuery
    query={graphql`
      {
        allFile(filter: { fields: { slug: { regex: "^/" } } }) {
          edges {
            node {
              id
              fields {
                slug
              }
              childMdx {
                frontmatter {
                  title
                }
              }
              relativePath
            }
          }
        }
      }
    `}
    render={data => <NavLinkBase data={data} path={path} title={title} />}
  ></StaticQuery>
)

export default NavLink
