import React, { Component } from "react"

export const lsStore = (key, data) => {
  // console.log("lsStore", key, data)
  window.localStorage.setItem(key, JSON.stringify(data))
}
export const lsCheck = key => {
  return window.localStorage.getItem(key)
}
export const lsClear = key => {
  window.localStorage.removeItem(key)
  // this.lsStatus("was deleted.")
}
export class LsStatus extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timer: 0,
    }

    this.handleTimer = this.handleTimer.bind(this)
  }

  handleTimer = () => {
    let interval
    let secsLeft = 5

    clearInterval(interval)

    interval = setInterval(() => {
      this.setState({ timer: secsLeft })
      secsLeft--

      if (secsLeft < 0) {
        this.setState({ timer: 0 })
        clearInterval(interval)
      }
    }, 1000)
  }

  componentDidMount() {
    // console.log("lsStatus mounted")
    // this.handleTimer()
  }

  render() {
    // console.log("lsStatus", this)

    return (
      <p className="w-full p-2 bg-green-100 border border-green-400 rounded">
        <strong>{this.props.fileName}</strong>, {this.props.status}
      </p>
    )
  }
}
