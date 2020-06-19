import React, { Component } from "react"
import { graphql, StaticQuery } from "gatsby"

class Child extends Component {
  componentDidMount() {
    console.log("MOUNT")

    this.props.action(this.props.data)
  }

  render() {
    console.log("Child Props", this.props)

    return (
      <div className="border border-gray-1 p-4">
        <h2>Child</h2>
        <pre>{JSON.stringify(this.props.data, null, 4)}</pre>
        <button onClick={this.props.action}>Button</button>
      </div>
    )
  }
}

export default ({ action }) => (
  <StaticQuery
    query={graphql`
      query {
        allFile(filter: { sourceInstanceName: { eq: "csv" } }) {
          edges {
            node {
              extension
              prettySize
              publicURL
              relativePath
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Child data={data} action={action} />
      </>
    )}
  />
)
