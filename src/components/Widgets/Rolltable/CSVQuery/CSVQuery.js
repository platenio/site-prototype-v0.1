import React, { Component } from "react"
import { graphql, StaticQuery } from "gatsby"
import Papa from "papaparse"

import { lsCheck } from "../LocalStorage"

class CSVQuery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fileRequested: false,
      fileData: false,
    }

    this.parseFile = this.parseFile.bind(this)
  }

  updateData = data => {
    // update child data
    this.setState({ fileData: data })

    // update parent data
    this.props.updateData({ data })
  }

  parseFile = (file, updateData) => {
    Papa.parse(file.node.publicURL, {
      download: true,
      complete: function (results) {
        const data = results.data

        updateData(data)
      },
    })
  }

  componentDidMount() {
    const files = this.props.data.allFile.edges
    const localData = lsCheck(this.props.table)

    if (localData) {
      // console.log(JSON.parse(localData))
      // const data = Papa.parse(localData)
      // const parsedData = JSON.parse(data.data[0])
      // console.log(parsedData)
      // this.updateData(data)
    } else {
      files.forEach(file => {
        if (this.props.src === file.node.relativePath) {
          this.setState({ fileRequested: file })
          this.parseFile(file, this.updateData)
          return
        }
      })
    }
  }

  render() {
    return (
      <>
        {this.props.debug && (
          <div className="w-full px-4 mt-4">
            <h3>CSV Query</h3>
            <pre>
              <h3>Query</h3>
              <br />
              {JSON.stringify(this.state.fileRequested, null, 4)}
              <br />
              <br />
              <h3>CSV Data</h3>
              <br />
              {JSON.stringify(this.state.fileData, null, 4)}
            </pre>
          </div>
        )}
      </>
    )
  }
}

export default ({ src, table, debug, updateData }) => (
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
        <CSVQuery
          data={data}
          src={src}
          table={table}
          debug={debug}
          updateData={updateData}
        />
      </>
    )}
  />
)
