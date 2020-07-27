import React, { Component } from "react"
import Papa from "papaparse"

import {
  //LsStatus,
  lsCheck,
  lsStore,
  lsClear,
} from "../LocalStorage"

import { FaFileUpload } from "react-icons/fa"

export default class CSVUpload extends Component {
  constructor(props) {
    super(props)

    this.state = {
      overlay: false,
      fileName: null,
      fileData: false,
      fileStatus: null,
      fileUpdated: false,
    }

    this.fileParse = this.fileParse.bind(this)
    this.fileStore = this.fileStore.bind(this)
    this.handleClearStorage = this.handleClearStorage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // ---------------------
  // Handle File Parsing
  // ---------------------
  fileParse = (file, callBack) => {
    Papa.parse(file, {
      complete: function (results) {
        callBack(file.name, results.data)
      },
    })
  }
  fileStore = (name, data) => {
    this.props.updateData({ data })
    this.setState({ fileName: name })
    this.setState({ fileData: data })
    this.setState({ fileStatus: "was saved locally" })
    this.setState({ fileUpdated: true })
  }

  // ---------------------
  // Handle Interactions
  // ---------------------
  handleOverlay = () => {
    this.setState({ overlay: !this.state.overlay })
  }
  handleClearStorage = e => {
    this.setState({ fileData: false })
    lsClear(this.props.table)
    e.preventDefault()
  }
  handleSubmit = e => {
    let file = e.target.querySelector('input[type="file"]').files[0]
    file && this.fileParse(file, this.fileStore)
    e.preventDefault()
  }

  // ---------------------
  // Component
  // ---------------------
  componentDidMount = () => {
    // Check LocalStorage for stored CSV data
    const data = lsCheck(this.props.table)
    data && this.setState({ fileData: JSON.parse(data) })
    data && this.setState({ fileUpdated: true })
  }
  componentDidUpdate = () => {
    // Store CSV Data into LocalStorage, only on upload
    if (this.state.fileUpdated) {
      let table = this.props.table
      let data = this.state.fileData

      this.props.updateData({ data })
      lsStore(table, data)

      this.setState({ fileUpdated: false })
    }
  }

  render() {
    return (
      <>
        <button
          type="button"
          className="flex-1 btn-outline"
          style={{ flexBasis: "200px" }}
          onClick={this.handleOverlay}
        >
          <span className="flex justify-center items-center">
            <FaFileUpload className="mr-1" /> Custom CSV
          </span>
        </button>

        {this.state.overlay && (
          <div className="absolute z-50 top-0 left-0 w-full h-full p-4">
            <span
              className="absolute top-0 left-0 w-full h-full bg-gray-900"
              onClick={this.handleOverlay}
              onKeyUp={this.handleOverlay}
              role="switch"
              aria-label="Close Upload Window"
              aria-checked={this.state.overlay}
              tabIndex="0"
            />
            <div
              className="relative w-full z-10 container mx-auto p-4 bg-white"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              <form onSubmit={this.handleSubmit}>
                <fieldset style={{ minInlineSize: "initial" }}>
                  <div className="flex flex-wrap justify-center items-center pt-2 pr-2 -mb-2 -ml-2">
                    <label
                      className="flex-1 max-w-full mb-2 ml-2"
                      htmlFor="upload-csv"
                    >
                      <span className="sr-only">Select a CSV file</span>
                      <input
                        type="file"
                        id="upload-csv"
                        name="upload-csv"
                        aria-label="Select a CSV File"
                        accept=".csv"
                        className="w-full p-2 text-gray-900 border-3 border-gray-900 hover:border-gray-800 focus:border-gray-900 cursor-pointer"
                      />
                    </label>

                    <button className="btn-primary mb-2 ml-2" type="submit">
                      <span className="flex justify-center items-center">
                        <FaFileUpload className="mr-1" /> Upload CSV
                      </span>
                    </button>
                  </div>
                </fieldset>

                <div className="flex-initial text-center text-xs italic">
                  {/* {this.state.fileStatus && (
                    <LsStatus
                      fileName={this.state.fileName}
                      status={this.state.fileStatus}
                    />
                  )} */}

                  <p>
                    <strong>Note:</strong> Upload's to your browser's Local
                    Storage.{" "}
                    <button onClick={e => this.handleClearStorage(e)}>
                      Delete stored data
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}

        {this.props.debug && (
          <div className="flex-1 w-full">
            <h3>CSV Upload</h3>
            <pre>{JSON.stringify(this.state, null, 4)}</pre>
          </div>
        )}
      </>
    )
  }
}
