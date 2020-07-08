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

  handleCollapse = toggle => {
    this.setState({ collapse: toggle })
  }

  render() {
    return (
      <li
        className="relative"
        onMouseEnter={() => this.handleCollapse(true)}
        onMouseLeave={() => this.handleCollapse(false)}
      >
        {this.props.path ? (
          <NavLink path={this.props.path} title={this.props.title} />
        ) : (
          // block p-2 font-bold cursor-pointer border-b-3
          <span className="fake-link">{this.props.title}</span>
        )}
        {this.state.collapse && (
          <ul
            className="absolute w-6xl right-0 bg-white border-3 border-gray-900 shadow-lg"
            stlye={{ bottom: "100%" }}
          >
            {this.props.children}
          </ul>
        )}
      </li>
    )
  }
}
