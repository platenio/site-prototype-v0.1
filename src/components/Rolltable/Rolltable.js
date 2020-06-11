import React, {
  useState, //useEffect
} from "react"
import fetch from "sync-fetch"
import parse from "csv-parse/lib/sync"
import { useStaticQuery, graphql } from "gatsby"

import {
  FaExpandArrowsAlt,
  FaCompressArrowsAlt,
  FaDiceD20,
} from "react-icons/fa"

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function getRandomEntry(tableName, column) {
  let table = getRollTable(tableName)
  let rows = table.rows.length
  clearSelectedEntries(tableName, column)
  let entry = table.rows[getRandomInteger(1, rows)].cells[column]
  console.log(
    `${table.rows[0].cells[column].textContent}: ${entry.textContent}`
  )
  entry.classList.add("selected")
  setResultText(tableName)
}

function getRandomEntries(tableName) {
  console.log("getRandomEntries")

  let table = getRollTable(tableName)
  let columns = table.rows[0].cells.length
  let i
  for (i = 1; i < columns; i++) {
    getRandomEntry(tableName, i)
  }
  setResultText(tableName)
}

function getRollTable(name) {
  return document.querySelector(`table#rolltable-${name}`)
}

function selectEntry(tableName, row, column) {
  let table = getRollTable(tableName)
  clearSelectedEntries(tableName, column)
  table.rows[row].cells[column].classList.add("selected")
  setResultText(tableName)
}

function clearSelectedEntries(tableName, column = null) {
  let selectedEntries = getSelectedEntries(tableName, column)
  for (let entry of selectedEntries) {
    entry.classList.remove("selected")
  }
  setResultText(tableName)
}

function getSelectedEntries(tableName, column = null) {
  let table = getRollTable(tableName)
  let selectedEntries = []
  for (let row of table.rows) {
    if (column == null) {
      for (let entry of row.cells) {
        if (entry.classList.contains("selected")) {
          selectedEntries.push(entry)
        }
      }
    } else {
      let entry = row.cells[column]
      if (entry.classList.contains("selected")) {
        selectedEntries.push(entry)
      }
    }
  }
  return selectedEntries
}

function setResultText(tableName) {
  let table = getRollTable(tableName)
  let result = document.querySelector("#result-" + tableName + " p")
  let entries = []

  let columnCount = table.rows[0].cells.length
  let i
  for (i = 1; i < columnCount; i++) {
    entries.push(getSelectedEntries(tableName, i))
  }
  entries = entries.flat(2)

  let text = ""
  for (let entry of entries) {
    text += `${entry.dataset.prefix} ${entry.innerText}`
  }
  text += "."
  // Why is this hack necessary???
  result.innerText = text.replace(" ,", ",").replace(" .", ".")
}

// ===============

export default function Rolltable(props) {
  const [state, setState] = useState({
    collapse: false,
    result: false,
  })

  // Toggle Table Collapse
  const toggleTableCollapse = () => {
    let collapse = !state.collapse
    setState({ collapse })
  }
  const toggleRandomize = () => {}

  const data = useStaticQuery(graphql`
    {
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
  `)
  const tableName = props.name.toLowerCase().replace(/\s+/g, "-")
  const files = data.allFile.edges
  let requestedFile = false

  // Find requested file
  files.forEach(file => {
    if (props.src === file.node.relativePath) {
      requestedFile = file
    }
  })

  const records = parse(fetch(requestedFile.node.publicURL).text())
  const headers = records[0]
  const prefixes = records[1]
  const entries = records.slice(2)

  const header_elements = []
  const header_class = "hover:bg-tertiary-400 px-5 py-2"
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

  const entry_elements = []
  for (const [row_index, row_data] of entries.entries()) {
    let elements = []
    for (const [index, entry] of row_data.entries()) {
      elements.push(
        <td
          key={index}
          className="hover:bg-tertiary-400 hover:text-white px-3 py-1"
          data-prefix={prefixes[index]}
          onClick={() => selectEntry(tableName, row_index + 1, index)}
          onKeyPress={() => selectEntry(tableName, row_index + 1, index)}
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

  return (
    <div
      id={`rolltable-${tableName}`}
      className="w-full block mt-8 border-2 border-tertiary-500 bg-white rounded shadow-md overflow-hidden"
    >
      {/* <pre>{JSON.stringify(records, null, 4)}</pre> */}

      {/* <hr /> */}

      <header className="flex justify-center items-stretch p-4">
        <div className="flex-auto">
          <h3>{props.name}</h3>

          <h4 className="italic">{props.caption && `${props.caption}`}</h4>
        </div>
        <div className="flex-initial">
          <button
            className="w-full btn-action text-xs flex justify-center items-center rounded-full"
            id={`rolltable-${tableName}-collapser`}
            onClick={toggleTableCollapse}
          >
            <span className="sr-only">
              {state.collapse ? "Open" : "Hide"} Module
            </span>
            {state.collapse ? <FaExpandArrowsAlt /> : <FaCompressArrowsAlt />}
          </button>
        </div>
      </header>

      <div id={`result-${tableName}`}>
        <p className="block py-4 px-8 font-bold text-2xl text-center"></p>
      </div>

      <menu
        type="toolbar"
        label="Rolltable Controls"
        className="m-0 p-4 bg-tertiary-200"
      >
        <button
          id={`rolltable-${tableName}-collapser`}
          className="block btn-action mx-auto"
          onClick={() => getRandomEntries(tableName)}
          // onClick={toggleRandomize}
        >
          <span className="flex justify-center items-center">
            <FaDiceD20 className="mr-1" /> Randomize
          </span>
        </button>
      </menu>

      <div className={state.collapse && "hidden"}>
        <p
          className={
            "text-xs italic py-2 px-4 m-0 " + (state.collapse && "hidden")
          }
        >
          <strong>Note:</strong> Click on any header to reroll for that column.
        </p>

        <table id={`rolltable-${tableName}`} className="w-full">
          <thead className="bg-tertiary-500 text-white text-bold cursor-pointer">
            <tr>{header_elements}</tr>
          </thead>

          <tbody>{entry_elements}</tbody>
        </table>
      </div>
    </div>
  )
}
