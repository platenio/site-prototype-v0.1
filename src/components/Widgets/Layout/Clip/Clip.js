import React, { Component } from "react"
import tw, { styled } from "twin.macro"

import { FaPaperclip, FaClipboardCheck } from "react-icons/fa"

import "../../../../Reset.scss"

const Content = styled.div`
  > :first-of-type {
    ${tw`mt-0`}
  }
`

const Notice = styled.div`
  bottom: 100%;
  right: -100vw;
  opacity: 0;
  transform: translateX(1em) translateZ(0);
  transition: opacity 0.15s cubic-bezier(0.65, 0.05, 0.36, 1),
    transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &.active {
    bottom: 0;
    right: 100%;
    opacity: 1;
    transform: translateX(0) translateZ(0);
  }
`

export default class Clip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
    }
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
      <div id={`clip-` + this.props.id} className="Reset pt-16">
        <div className="flex flex-wrap justify-start items-start">
          <div className="flex-1 prose">
            <Content>{this.props.children}</Content>
          </div>
          <div className="mb-4">
            <div className="relative">
              <Notice
                className={
                  `absolute z-40 flex justify-start items-center p-2 leading-none text-center font-light text-white bg-gray-900 shadow-lg ` +
                  (this.state.active && "active")
                }
              >
                Copied
              </Notice>
              <button
                className={
                  `p-2 hover:text-white font-bold cursor-pointer hover:bg-gray-900 ` +
                  (this.state.active
                    ? "text-white bg-gray-900"
                    : "text-gray-700 bg-white")
                }
                onClick={() => this.handleTimeout()}
              >
                {this.state.active ? <FaClipboardCheck /> : <FaPaperclip />}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
