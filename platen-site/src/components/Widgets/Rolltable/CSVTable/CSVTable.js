import React, { Component } from "react"
import {
  getRandomEntry,
  getRandomEntries,
  selectEntry,
} from "../SelectionLogic"
import tw, { styled } from "twin.macro"

const RollTable = styled.table`
  .selected {
    button {
      ${tw`text-white bg-cmykRed-500`};
    }
  }
`

const defaultBtn =
  "block w-full p-2 text-left hover:text-white hover:bg-gray-700"

function getHeaderElements(tableName, data) {
  const header_elements = []
  const headers = data[0]

  for (const [index, header] of headers.entries()) {
    header_elements.push(
      <th
        key={index}
        // onClick={() =>
        //   index === 0
        //     ? getRandomEntry(tableName, index)
        //     : getRandomEntries(tableName)
        // }
        // onKeyPress={() =>
        //   index === 0
        //     ? getRandomEntry(tableName, index)
        //     : getRandomEntries(tableName)
        // }
      >
        <button className={defaultBtn}>HERE {header}</button>
      </th>
    )
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
        <td key={index} data-prefix={prefixes[index]}>
          <button
            className={"py-1 " + defaultBtn}
            onClick={() => selectEntry(tableName, row_index, index)}
            onKeyPress={() => selectEntry(tableName, row_index, index)}
          >
            {entry}
          </button>
        </td>
      )
    }
    entry_elements.push(
      <tr key={row_index} className="even:bg-white even:bg-opacity-10">
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
      <RollTable id={`rolltable-${name}`}>
        <thead className="text-gray-900 text-left border-b-3 border-gray-900 cursor-pointer">
          {getHeaderElements(name, data)}
        </thead>
        <tbody>{getEntryElements(name, data)}</tbody>
      </RollTable>
    )
  }
}
