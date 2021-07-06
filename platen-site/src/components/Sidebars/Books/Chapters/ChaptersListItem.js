import React, { Component } from "react"
import { Link } from "gatsby"

import {
  RiBookReadFill,
  RiArrowUpSFill,
  RiArrowDownSFill,
} from "react-icons/ri"

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
    const { slug, location, chapter } = this.props
    let currentCh = location.pathname === (slug ? slug : chapter.fields.slug)
    currentCh && this.setState({ active: true })
  }

  render() {
    const ch = this.props.chapter
    const slug = ch ? ch.fields.slug : this.props.slug
    const title = ch ? ch.childMdx.frontmatter.title : "Contents"
    const chapter = ch && ch.fields.chapter
    const chIndex = ch && ("0" + chapter).slice(-2)

    return (
      <li data={ch}>
        <div className="flex justify-start items-stretch">
          <div className="flex-1">
            <Link
              to={slug}
              className="btn-ghost-alt flex justify-start items-stretch px-2 text-sm text-left"
              activeClassName="active"
            >
              <span className="flex-initial w-6 flex justify-center items-center text-xs font-thin font-fira-code">
                {ch ? <>{chIndex}</> : <RiBookReadFill />}
              </span>
              <span className="flex-1">{title}</span>
            </Link>
          </div>

          {/* Display clips toggle button only if clips exists */}
          {this.state.hasClips && (
            <button
              className="btn-ghost-alt px-2"
              onClick={() => this.toggleDisplay()}
            >
              {this.state.active ? <RiArrowDownSFill /> : <RiArrowUpSFill />}
            </button>
          )}
        </div>

        {ch && (
          <ChaptersClipsList
            active={this.state.active}
            chapter={chIndex - 1}
            chapters={this.props.chapters}
            location={this.props.location}
            hasClips={this.handleHasClips}
          />
        )}
      </li>
    )
  }
}
