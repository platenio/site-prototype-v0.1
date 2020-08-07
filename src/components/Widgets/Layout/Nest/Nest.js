import React, { Component } from "react"

import { motion } from "framer-motion"
import { FaFolderOpen, FaFolder } from "react-icons/fa"

const variants = {
  open: { opacity: 1, maxHeight: 600 },
  closed: { opacity: 0, maxHeight: 0 },
}

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
    return (
      <div className="w-full mt-4">
        <header
          className={
            `flex justify-start items-start pb-4 border-b-3 border-gray-900`
            // + (this.state.active && " border-b-3")
          }
        >
          <div className="flex-1 mr-2">
            <h2 className="m-0">{this.props.title}</h2>
          </div>
          <div>
            <button
              className="btn-primary text-xs flex justify-center items-center"
              id={`nest-toggle`}
              onClick={() => this.toggleDisplay()}
            >
              <span className="sr-only">
                {this.state.active ? "Open" : "Hide"} Contents
              </span>
              {this.state.active ? <FaFolderOpen /> : <FaFolder />}
            </button>
          </div>
        </header>
        <motion.div
          className="border-r-3 border-b-3 border-l-3 border-gray-900 overflow-y-scroll overflow-x-hidden"
          initial={false}
          animate={this.state.active ? "open" : "closed"}
          variants={variants}
        >
          <div className="p-4 overflow-x-hidden">{this.props.children}</div>
        </motion.div>
      </div>
    )
  }
}
