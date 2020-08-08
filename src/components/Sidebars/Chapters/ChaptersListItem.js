import React, { Component } from "react"
import { Link } from "gatsby"

import { FaCaretDown, FaCaretUp } from "react-icons/fa"

import ChaptersClipsList from "./ChaptersClipsList"

export default class ChaptersListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      hasClips: false,
    }
  }

  toggleDisplay = () => {
    this.setState({ active: !this.state.active })
  }
  handleHasClips = hasClips => {
    this.setState({ hasClips: hasClips })
  }

  componentDidMount() {
    // Update state to active, if "open" variable set
    const { location, chapter } = this.props
    let currentCh = location.pathname === chapter.fields.slug
    currentCh && this.setState({ active: true })
  }

  render() {
    const ch = this.props.chapter
    const { title } = ch.childMdx.frontmatter
    const { slug, chapter } = ch.fields
    let chIndex = ("0" + chapter).slice(-2)

    return (
      <li data={ch}>
        <div className="flex justify-start items-stretch">
          <div className="flex-1">
            <Link
              to={slug}
              className="btn-invert flex justify-start items-start px-2 text-sm text-left"
              activeClassName="active"
            >
              <span className="mr-2 font-thin font-fira-code">{chIndex}</span>
              <span className="flex-1">{title}</span>
            </Link>
          </div>

          {/* Display clips toggle button only if clips exists */}
          {this.state.hasClips && (
            <div>
              <button
                className="btn-invert px-2 text-cmykBlue-500 hover:text-cmykBlue-300 focus:text-cmykBlue-300 active:text-cmykBlue-100"
                onClick={() => this.toggleDisplay()}
              >
                {this.state.active ? <FaCaretDown /> : <FaCaretUp />}
              </button>
            </div>
          )}
        </div>

        <ChaptersClipsList
          active={this.state.active}
          chapter={chIndex - 1}
          chapters={this.props.chapters}
          location={this.props.location}
          hasClips={this.handleHasClips}
        />
      </li>
    )
  }
}
