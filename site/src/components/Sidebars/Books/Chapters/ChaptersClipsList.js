import React, { Component } from "react"
import { Link } from "gatsby"
import scrollTo from "gatsby-plugin-smoothscroll"

import { motion } from "framer-motion"
import { RiAttachmentLine } from "react-icons/ri"

export default class ChaptersClipsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clips: [],
    }
  }

  // Create clips list
  buildClipsList = (chapter, chapters, location) => {
    let clipsList = []
    const ch = chapters[chapter]
    const mdx = ch.childMdx.mdxAST.children
    const slug = ch.fields.slug
    const curCh = location.pathname === slug

    // Find <Clips /> inside page contents
    mdx.forEach((item, i) => {
      if (item.type === "jsx") {
        const val = item.value
        const regex = new RegExp("^<Clip", "g")
        const match = val && val.match(regex)

        if (match) {
          const idRegex = new RegExp('id="(.+?)"', "g")
          const idMatch = idRegex.exec(val)
          const id = idMatch[1]
          const link = slug + "#clip-" + id
          const nextItem = mdx[i + 1]
          let title = id

          // If headling, replace id title
          if (nextItem.type === "heading") {
            title = "" // reset
            nextItem.children.forEach(item => {
              if (item.type === "text") {
                title += item.value
              }
            })
          }

          clipsList.push({ curCh, id, link, title })
        }
      }
    })

    if (clipsList.length > 0) {
      this.setState({ clips: clipsList })
      this.props.hasClips(true)
    }
  }

  componentDidMount() {
    const { chapter, chapters, location } = this.props
    this.buildClipsList(chapter, chapters, location)
  }

  render() {
    const collapseAnimation = {
      open: { height: "auto", opacity: 1 },
      closed: { height: 0, opacity: 0 },
    }

    return (
      <motion.ul
        className="bg-gray-800 overflow-hidden"
        initial={false}
        animate={this.props.active ? "open" : "closed"}
        variants={collapseAnimation}
      >
        {this.state.clips.map((clip, i) => {
          const tabIndex = this.props.active ? "0" : "-1"
          const style =
            "btn-dark flex justify-start items-stretch w-full py-0 text-left text-xs font-fira-code"
          const content = (
            <>
              <span className="flex-initial w-6 flex justify-center items-center">
                <RiAttachmentLine />
              </span>
              <span className="flex-1">{clip.title}</span>
            </>
          )

          return (
            <li key={`clip-link-` + i}>
              {clip.curCh ? (
                <button
                  className={style}
                  onClick={() => scrollTo("#clip-" + clip.id)}
                  tabIndex={tabIndex}
                >
                  {content}
                </button>
              ) : (
                <Link className={style} to={clip.link} tabIndex={tabIndex}>
                  {content}
                </Link>
              )}
            </li>
          )
        })}
      </motion.ul>
    )
  }
}
