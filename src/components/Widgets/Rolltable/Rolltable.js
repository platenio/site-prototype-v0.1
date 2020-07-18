// TODO: Rolltable, Alerts for required variables
// TODO: Rolltable, Hide elements until data is ready
// TODO: Rolltable, Prop Types
// TODO: Rolltable, Refactor build table script

import React, { Component } from "react"
// import { MDXProvider } from "@mdx-js/react"

import CSVQuery from "./CSVQuery/CSVQuery"
import CSVUpload from "./CSVUpload/CSVUpload"
// import CSVTable from "./CSVTable/CSVTable"
import Table from "./Table"
// import { getRandomEntries } from "./SelectionLogic"

// import Notes from "./Notes.mdx"

import {
  FaBug,
  FaSprayCan,
  FaExpandArrowsAlt,
  FaCompressArrowsAlt,
  FaDiceD20,
} from "react-icons/fa"

import "../../../Reset.scss"

export default class Rolltable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      collapse: false,
      debug: false,
      fileData: false,
      result: false,
    }

    this.updateData = this.updateData.bind(this)
  }

  toggleTableCollapse = () => {
    let collapse = !this.state.collapse
    this.setState({ collapse })
  }
  toggleDebug = () => {
    let debug = !this.state.debug
    this.setState({ debug })
  }
  updateData = ({ data }) => {
    this.setState({ fileData: data })
  }

  render() {
    const { name, caption, src, allowUpload, showDebug } = this.props
    const tableName = name.toLowerCase().replace(/\s+/g, "-")

    return (
      <>
        <div
          role="form"
          id={`rolltable-${tableName}`}
          className="Reset relative w-full block mt-8 border-3 border-gray-900 bg-white overflow-hidden"
        >
          <header>
            <div className="w-full flex justify-center items-stretch pt-4 px-4">
              <div className="flex-auto">
                <h3>{name}</h3>

                <h4 className="italic">{caption && caption}</h4>
              </div>
              <div>
                <ul className="flex-initial flex flex-wrap justify-center items-start pt-1 pr-1 -mb-1 -ml-1">
                  {showDebug === true && (
                    <li className="mb-1 ml-1">
                      <button
                        className="btn-primary text-xs flex justify-center items-center"
                        id={`rolltable-${tableName}-debug`}
                        onClick={this.toggleDebug}
                      >
                        <span className="sr-only">
                          {this.state.debug ? "Open" : "Hide"} Debugger
                        </span>
                        {this.state.debug ? <FaSprayCan /> : <FaBug />}
                      </button>
                    </li>
                  )}
                  <li className="mb-1 ml-1">
                    {this.state.fileData && (
                      <button
                        className="btn-primary text-xs flex justify-center items-center"
                        id={`rolltable-${tableName}-collapser`}
                        onClick={this.toggleTableCollapse}
                      >
                        <span className="sr-only">
                          {this.state.collapse ? "Open" : "Hide"} Module
                        </span>
                        {this.state.collapse ? (
                          <FaExpandArrowsAlt />
                        ) : (
                          <FaCompressArrowsAlt />
                        )}
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            </div>

            {this.state.debug && (
              <div className="w-full px-4 mt-4">
                <h3>Component State</h3>
                <pre>{JSON.stringify(this.state, null, 4)}</pre>
              </div>
            )}

            {/* <div className="mw-full mx-2 p-2 text-xs list-disc bg-yellow-200 rounded">
              <MDXProvider>
                <Notes />
              </MDXProvider>
            </div> */}

            <CSVQuery
              src={src}
              table={tableName}
              debug={this.state.debug}
              updateData={this.updateData}
            />
          </header>

          {(!this.state.fileData || this.state.status) && (
            <div id={`result-${tableName}`} className="mt-4">
              <p className="block py-4 px-8 font-bold text-2xl text-center">
                {this.state.result && "Result"}

                {!this.state.fileData && (
                  <span className="block p-4 text-sm text-gray-900 border-3 border-cmykYellow-600 bg-cmykYellow-500">
                    Cannot generate results. Please Add or Upload a CSV.
                  </span>
                )}
              </p>
            </div>
          )}
          <menu
            type="toolbar"
            label="Rolltable Controls"
            className="flex justify-center p-0 m-0 mt-4 bg-gray-100"
          >
            <ul className="flex flex-wrap justify-start align-center p-0 m-0 pt-2 pr-2">
              {allowUpload === "true" && (
                <li className="mb-2 ml-2">
                  <CSVUpload
                    table={tableName}
                    debug={this.state.debug}
                    updateData={this.updateData}
                  />
                </li>
              )}

              {this.state.fileData && (
                <li className="mb-2 ml-2">
                  <button
                    id={`rolltable-${tableName}-collapser`}
                    className="flex-1 btn-primary"
                    style={{ flexBasis: "200px" }}
                    // onClick={() => getRandomEntries(tableName)}
                    // onClick={toggleRandomize}
                  >
                    <span className="flex justify-center items-center">
                      <FaDiceD20 className="mr-1" /> Randomize
                    </span>
                  </button>
                </li>
              )}
            </ul>
          </menu>
          {this.state.fileData && (
            <div
              className={
                `w-full pt-2 text-white bg-gray-900 ` +
                (this.state.collapse && "hidden")
              }
            >
              {/* <div className="pt-2 w-full"> */}
              <p className="px-4 mx-auto text-center text-xs italic">
                <strong>Note:</strong> Click on any header to reroll for that
                column.
              </p>

              <div
                className="overflow-scroll"
                // style={{ maxHeight: "25ch" }}
              >
                {/* <CSVTable
                  name={tableName}
                  data={this.state.fileData}
                  className="w-full mt-4"
                /> */}
                <Table data={this.state.fileData} />
              </div>
            </div>
          )}
        </div>
      </>
    )
  }
}
