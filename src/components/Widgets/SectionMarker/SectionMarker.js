import React, { Component } from "react"

export default class SectionMarker extends Component {
  render() {
    const id = this.props.title.replace(/\s+/g, "-").toLowerCase()

    return <hr id={id} />
  }
}
