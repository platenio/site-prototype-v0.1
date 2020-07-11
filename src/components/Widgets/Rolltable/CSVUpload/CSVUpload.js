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
      fileData: null,
      fileStatus: null,
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
    this.setState({ fileData: data })
  }
  componentDidUpdate = () => {
    // Store CSV Data into LocalStorage
    this.state.fileData && lsStore(this.props.table, this.state.fileData)
  }

  render() {
    return (
      <>
        <button
          type="button"
          className="flex-1 btn-action-outline"
          style={{ flexBasis: "200px" }}
          onClick={this.handleOverlay}
        >
          <span className="flex justify-center items-center">
            <FaFileUpload className="mr-1" /> Custom CSV
          </span>
        </button>

        {this.state.overlay && (
          <div className="absolute z-50 top-0 left-0 w-full h-full p-8">
            <span
              className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75"
              onClick={this.handleOverlay}
              onKeyUp={this.handleOverlay}
              role="switch"
              aria-label="Close Upload Window"
              aria-checked={this.state.overlay}
              tabIndex="0"
            />
            <div
              className="relative z-10 container mx-auto p-4 bg-white rounded shadow"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              <form onSubmit={this.handleSubmit}>
                <fieldset className="flex flex-wrap justify-center items-center gap-2">
                  <label className="flex-1" htmlFor="upload-csv">
                    <span className="sr-only">Select a CSV file</span>
                    <input
                      type="file"
                      id="upload-csv"
                      name="upload-csv"
                      aria-label="Select a CSV File"
                      accept=".csv"
                      className="w-full p-2 text-center text-gray-900 bg-gray-200 hover:bg-gray-100 focus:bg-gray-100 rounded cursor-pointer"
                    />
                  </label>

                  <button
                    className="flex-initial btn-action mx-auto"
                    type="submit"
                  >
                    <span className="flex justify-center items-center">
                      <FaFileUpload className="mr-1" /> Upload CSV
                    </span>
                  </button>
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
