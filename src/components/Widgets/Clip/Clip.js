import React, { Component } from "react"
import tw, { styled } from "twin.macro"

import { FaPaperclip, FaClipboardCheck } from "react-icons/fa"

const Notice = styled.div`
  bottom: 100%;
  right: -100vw;
  opacity: 0;
  transform: translateY(1em) translateZ(0);
  transition: opacity 0.15s cubic-bezier(0.65, 0.05, 0.36, 1),
    transform 0.15s cubic-bezier(0.68, -0.55, 0.27, 1.55);

  &.active {
    bottom: calc(100% + 1em);
    right: 0;
    opacity: 1;
    transform: translateY(0) translateZ(0);
  }
`

export default class Clip extends Component {
  state = {
    active: false,
  }

  handleCopy = () => {
    const { origin, pathname } = this.props.location
    const copyText = origin + pathname + "#clip-" + this.props.id

    navigator.clipboard.writeText(copyText)
  }
  handleTimeout = () => {
    clearTimeout(this.timeout)
    this.setState({ active: true })
    this.handleCopy()

    this.timeout = setTimeout(() => {
      this.setState({ active: false })
    }, 3000)
  }

  render() {
    return (
      <div
        id={`section-` + this.props.id}
        className="flex flex-wrap justify-start items-end pt-8"
      >
        <span className="flex-1">{this.props.children}</span>
        <button
          className="relative pr-1 text-gray-300 hover:text-gray-900 font-bold cursor-pointer"
          onClick={() => this.handleTimeout()}
        >
          <Notice
            className={
              `absolute flex justify-start items-center px-2 py-1 text-center text-sm text-white bg-gray-900 rounded shadow-lg ` +
              (this.state.active && "active")
            }
          >
            <FaClipboardCheck className="mr-1" /> Copied
          </Notice>
          <FaPaperclip />
        </button>
      </div>
    )
  }
}
