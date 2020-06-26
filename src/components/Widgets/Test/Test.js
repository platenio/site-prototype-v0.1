import React, { Component } from "react"

import Child from "./Child"

export default class ParentComponent extends Component {
  constructor(props) {
    super(props)

    // Bind the this context to the handler function
    this.handler = this.handler.bind(this)

    // Set some state
    this.state = {
      messageShown: false,
      data: null,
    }
  }

  // This method will be sent to the child component
  handler(data) {
    console.log("handler", data)

    this.setState({
      messageShown: !this.state.messageShown,
    })
    this.setState({ data: data })
  }

  // Render the child component and set the action property with the handler as value
  render() {
    console.log("parent")

    return (
      <>
        <h1>Parent</h1>
        <pre>{JSON.stringify(this.state.data, null, 4)}</pre>
        {/* {this.state.messageShown && <p>Showing Message</p>} */}

        <Child action={this.handler} />
      </>
    )
  }
}
