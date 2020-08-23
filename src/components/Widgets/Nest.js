import React, { Component } from "react"

import { motion } from "framer-motion"
import { RiFolder5Fill, RiFolder3Fill } from "react-icons/ri"

export default class Nest extends Component {
  state = {
    active: false,
  }

  toggleDisplay = () => {
    this.setState({ active: !this.state.active })
  }

  componentDidMount() {
    // Update state to active, if "open" variable set
    let open = this.props.open === true

    open && this.setState({ active: true })
  }

  render() {
    const height = this.props.maxHeight
      ? this.props.maxHeight === "none"
        ? "auto" // set none
        : this.props.maxHeight // set custom
      : "600px" // set default

    const collapseAnimation = {
      open: { opacity: 1, height: height },
      closed: { opacity: 0, height: 0 },
    }

    return (
      <div className="w-full mt-4">
        <header className="flex justify-start items-start pb-2 border-b-3 border-gray-900">
          <div className="flex-1 mr-2">
            <p className="m-0 text-lg font-bold">{this.props.title}</p>
          </div>
          <div>
            <button
              className="btn-light text-xs flex justify-center items-center"
              id={`nest-toggle`}
              onClick={() => this.toggleDisplay()}
            >
              <span className="sr-only">
                {this.state.active ? "Open" : "Hide"} Contents
              </span>
              {this.state.active ? <RiFolder5Fill /> : <RiFolder3Fill />}
            </button>
          </div>
        </header>
        <motion.div
          className="border-r-3 border-b-3 border-l-3 border-gray-900 overflow-y-scroll overflow-x-hidden"
          initial={false}
          animate={this.state.active ? "open" : "closed"}
          variants={collapseAnimation}
        >
          <div className="p-4 overflow-x-hidden prose">
            {this.props.children}
          </div>
        </motion.div>
      </div>
    )
  }
}
