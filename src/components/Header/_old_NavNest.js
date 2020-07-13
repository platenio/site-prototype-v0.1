import React, { Component } from "react"

import NavLink from "./NavLink"

export default class NavNest extends Component {
  constructor(props) {
    super(props)

    this.state = {
      collapse: false,
    }

    this.handleCollapse = this.handleCollapse.bind(this)
  }

  handleCollapse = (e, toggle) => {
    // console.log("handleCollapse", e)
    console.log(toggle)

    this.setState({ collapse: toggle || !this.state.collapse })
    //
  }

  render() {
    const { path, title, children } = this.props

    return (
      <li
        className="relative"
        // tabIndex="0"
        // onKeyPress={e => this.handleCollapse(e)}
        // onMouseEnter={e => this.handleCollapse(e, true)}
        // onMouseLeave={e => this.handleCollapse(e, false)}
      >
        {path ? (
          <NavLink path={path} title={title} />
        ) : (
          // block p-2 font-bold cursor-pointer border-b-3
          <span className="fake-link">{title}</span>
        )}

        {this.state.collapse && (
          <ul
            className="absolute right-0 bg-white border-3 border-gray-900 shadow-lg"
            style={{ top: "100%", width: "200px" }}
          >
            {children}
          </ul>
        )}
      </li>
    )
  }
}
