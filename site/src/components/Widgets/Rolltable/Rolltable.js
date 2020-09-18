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

import { FaBug, FaSprayCan, FaDiceD20, FaInfoCircle } from "react-icons/fa"
import { RiTableAltFill, RiCloseCircleFill } from "react-icons/ri"

export default class Rolltable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      collapse: true,
      debug: false,
      fileData: false,
      result: false,
    }

    this.updateData = this.updateData.bind(this)
  }

  handleRandomAll = () => {
    this.refs.table.handleRamdomAll()
  }
  handleResults = results => {
    this.setState({ result: results })
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
    data && this.setState({ fileData: data })
  }

  render() {
    const { name, caption, src, allowUpload, showDebug } = this.props
    const tableName = name.toLowerCase().replace(/\s+/g, "-")

    return (
      <>
        <div
          role="form"
          id={`rolltable-${tableName}`}
          className="relative w-full block mt-8 border-3 border-gray-900 bg-white overflow-hidden"
        >
          {/*
          ------------------
          HEADER
          ------------------
          */}
          <header className="bg-gray-100">
            <div className="w-full flex justify-center items-center py-2 px-4">
              {/*
              ------------------
              HEADER
              ------------------
              */}
              <div className="flex-auto prose">
                <h3>{name}</h3>

                {caption && <p>{caption}</p>}
              </div>

              {/*
              ------------------
              CONTROLS, WIDGET
              ------------------
              */}
              <div>
                <ul className="flex-initial flex flex-wrap justify-center items-start space-x-1">
                  {showDebug === true && (
                    <li>
                      <button
                        className="btn-light flex justify-center items-center"
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
                  <li>
                    {this.state.fileData && (
                      <button
                        className="btn-light flex justify-center items-center"
                        id={`rolltable-${tableName}-collapser`}
                        onClick={this.toggleTableCollapse}
                      >
                        <span className="sr-only">
                          {this.state.collapse ? "Open" : "Hide"} Module
                        </span>
                        {this.state.collapse ? (
                          <RiTableAltFill />
                        ) : (
                          <RiCloseCircleFill />
                        )}
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            </div>

            {/*
            ------------------
            DEBUG, COMPONENT STATE
            ------------------
            */}
            {this.state.debug && (
              <div className="w-full px-4 mt-4">
                <h3>Component State</h3>
                <pre>{JSON.stringify(this.state, null, 4)}</pre>
              </div>
            )}

            <CSVQuery
              src={src}
              table={tableName}
              debug={this.state.debug}
              updateData={this.updateData}
            />
          </header>

          {/*
          ------------------
          RESULTS
          ------------------
          */}
          {this.state.fileData && (
            <div id={`result-${tableName}`} className="mt-4">
              <div className="block py-4 px-4 m-0 font-bold text-2xl leading-tight max-w-full">
                {this.state.result}

                {!this.state.fileData && (
                  <p className="block p-4 text-sm text-gray-900 border-3 border-cmykYellow-600 bg-cmykYellow-500">
                    Cannot generate results. Please Add or Upload a CSV.
                  </p>
                )}
              </div>
            </div>
          )}

          {/*
          ------------------
          CONTROLS, DATA
          ------------------
          */}
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
                    onClick={() => this.handleRandomAll()}
                  >
                    <span className="flex justify-center items-center">
                      <FaDiceD20 className="mr-1" /> Randomize
                    </span>
                  </button>
                </li>
              )}
            </ul>
          </menu>

          {/*
          ------------------
          TABLE
          ------------------
          */}
          {this.state.fileData && (
            <div
              className={
                `pt-2 text-gray-500 bg-gray-900 ` +
                (this.state.collapse && "hidden")
              }
            >
              <div className="px-4">
                <Table
                  id={`rolltable-${tableName}`}
                  data={this.state.fileData}
                  resultsMsg={this.props.children}
                  handleResults={this.handleResults}
                  ref="table"
                />
              </div>

              <div className="flex flex-wrap justify-start items-start text-xs pt-2 pb-4 px-4 -mb-1 -ml-1 leading-none">
                {/* TODO: Convert to tooltip */}
                <div className="flex-1 mb-1 ml-1">
                  <p className="m-0 flex justify-start items-end">
                    <FaInfoCircle className="inline-block mr-1" />
                    <span>Click on any header to reroll for that column</span>
                  </p>
                </div>
                <div className="mb-1 ml-1">
                  <p className="m-0">{this.props.src}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    )
  }
}
