import React, { Component } from "react"
import { getRandomEntry, getRandomEntries, selectEntry } from "../SelectionLogic"

function getHeaderElements(tableName, data) {
  const header_elements = []
  const header_class = "hover:bg-tertiary-400 px-5 py-2"
  const headers = data[0]
  for (const [index, header] of headers.entries()) {
    if (index === 0) {
      header_elements.push(
        <th
          key={index}
          onClick={() => getRandomEntries(tableName)}
          onKeyPress={() => getRandomEntries(tableName)}
          className={header_class}
        >
          {header}
        </th>
      )
    } else {
      header_elements.push(
        <th
          key={index}
          onClick={() => getRandomEntry(tableName, index)}
          onKeyPress={() => getRandomEntry(tableName, index)}
          className={header_class}
        >
          {header}
        </th>
      )
    }
  }
  return header_elements
}

function getEntryElements(tableName, data) {
  const entries = data.slice(2)
  const prefixes = data[1]
  const entry_elements = []
  for (const [row_index, row_data] of entries.entries()) {
    let elements = []
    for (const [index, entry] of row_data.entries()) {
      elements.push(
        <td
          key={index}
          className="hover:bg-tertiary-400 hover:text-white px-3 py-1"
          data-prefix={prefixes[index]}
          onClick={() => selectEntry(tableName, row_index, index)}
          onKeyPress={() => selectEntry(tableName, row_index, index)}
        >
          {entry}
        </td>
      )
    }
    entry_elements.push(
      <tr key={row_index} className="even:bg-tertiary-100">
        {elements}
      </tr>
    )
  }
  return entry_elements
}

export default class Rolltable extends Component {
  render() {
    const { name } = this.props
    const { data } = this.props

    return (
      <table id={`rolltable-${name}`} className="w-full">
        <thead className="bg-tertiary-500 text-white text-bold cursor-pointer">
          {getHeaderElements(name, data)}
        </thead>
        <tbody>
          {getEntryElements(name, data)}
        </tbody>

        {/* <tbody>{entry_elements}</tbody> */}
      </table>
    )
  }
}
