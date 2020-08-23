import React, { Component } from "react"

import "../../../styles/components/buttons.css"

import TableCell from "./TableCell.js"

export default class Table extends Component {
  constructor(props) {
    super(props)

    this.state = {
      table: false,
      tableCols: false,
      tableHeadData: [],
      // tableBodyData: [],
      results: [],
    }
  }

  handleRamdomAll = () => {
    const colLength = this.state.table.length

    for (let i = 0; i < colLength; i++) {
      setTimeout(() => this.handleRandomCell(i), 0)
    }
  }

  handleRandomCell = (col, e) => {
    if (e) {
      if (e.keyCode !== 13) {
        console.log("handleRandomCell", e.keyCode)
        return
      }
    }

    const curCol = this.state.table[col]
    const rowLength = curCol.length
    const rowMin = Math.ceil(1) // avoid head, 0
    const rowMax = Math.floor(rowLength)
    const randomRow = Math.floor(Math.random() * (rowMax - rowMin) + rowMin)

    this.handleActiveCell(randomRow, col)
  }

  handleActiveCell = (row, col, e) => {
    if (e) {
      if (e.keyCode !== 13) {
        console.log("handleActiveCell", e.keyCode)
        return
      }
    }

    // create table clone
    let table = [...this.state.table]
    const colLength = table.length
    const activeValue = table[col][row].value

    // Clear all active children
    table[col].forEach((data, i) => {
      if (i !== 0 && data.active === true) {
        data.active = false
      }
    })
    // Active selected child
    table[col][row].active = true

    // Update table
    this.setState({ table: table })

    this.handleResultsUpdate(activeValue, col, colLength)
  }

  handleResultsUpdate = (newValue, col, colLength) => {
    let resultsTemplate = []
    let newResults = [...this.state.results]
    let resultsMsg = this.props.resultsMsg && [...this.props.resultsMsg]
    let baseStyles = " btn-ghost"
    // "leading-none font-bold text-cmykBlue-500 bg-cmykBlue-100 bg-opacity-25 cursor-pointer hover:bg-cmykBlue-100 hover:bg-opacity-100 focus:bg-cmykBlue-100 focus:bg-opacity-100 active:bg-cmykBlue-200 active:bg-opacity-100 select-none"

    // For variables not yet randomized, insert ...
    for (var i = 0; i < colLength; i++) {
      !newResults[i] &&
        (newResults[i] = (
          <span key={i} className="text-cmykRed-100">
            ...
          </span>
        ))
      if (col === 1 && newValue === "") {
        newResults[i] = (
          <span key={i} className="text-cmykRed-100">
            ...
          </span>
        )
      }
      col === i && (newResults[i] = newValue)
    }

    // If there's child content, replace variables in content
    if (resultsMsg) {
      resultsMsg.forEach((child, i) => {
        if (child.props) {
          const type = child.props.mdxType.replace(/^rt/g, "")
          const data = this.state.tableHeadData
          const matchIndex = data.findIndex(obj => obj === type)
          const value =
            newResults[matchIndex].length > 0 ? newResults[matchIndex] : "…"

          value &&
            (resultsMsg[i] = (
              <button
                key={i}
                tabIndex="0"
                onClick={() => this.handleRandomCell(matchIndex)}
                onKeyUp={e => this.handleRandomCell(matchIndex, e)}
                className={`inline-block p-1 -mx-1 ` + baseStyles}
              >
                {value}
              </button>
            ))
        }
      })

      resultsTemplate.push(resultsMsg)

      // Otherwise, fallback to basic variable blocks layout
    } else {
      const newResultsData = []

      newResults.forEach((item, i) => {
        const itemLength = item.length > 0

        newResultsData.push(
          <button
            key={i}
            tabIndex="0"
            onClick={() => this.handleRandomCell(i)}
            onKeyUp={e => this.handleRandomCell(i, e)}
            className={
              `flex justify-center items-start h-full p-2 mb-2 ml-2 ` +
              (!itemLength && "bg-cmykRed-100 text-cmykRed-500 ") +
              baseStyles
            }
          >
            <span>{itemLength ? item : "Empty"}</span>
          </button>
        )
      })

      resultsTemplate.push(
        <div
          key="1"
          className="flex justify-start items-start pt-2 pr-2 -mb-2 -ml-2"
        >
          {newResultsData}
        </div>
      )
    }

    // Push results to state and handle results message
    this.setState({ results: newResults })
    this.props.handleResults(resultsTemplate)
  }

  buildTableHead = (key, value) => {
    return (
      <tr>
        <th key={key}>{value}</th>
      </tr>
    )
  }

  buildTableBody = items => {
    const colLength = items.length
    const rowLength = items[0].length
    let table = []
    let tableData = []
    let tableHead = []
    let tableBody = []

    // loop data and create table data
    for (var row = 0; row < rowLength; row++) {
      for (var col = 0; col < colLength; col++) {
        const item = items[col][row]
        const { value, active } = item
        const key = row + "-" + col

        tableData.push(
          <TableCell
            key={key}
            row={row}
            col={col}
            thead={row === 0}
            active={active}
            handleActiveCell={this.handleActiveCell}
            handleRandomCell={this.handleRandomCell}
          >
            {value}
          </TableCell>
        )
      }
    }

    // loop table data and apply rows
    for (var dataIndex = 0; dataIndex < rowLength; dataIndex++) {
      const tableRowData = []
      const tableRow = []
      let tableRowIndex = dataIndex === 0 && true

      function findData(row, col) {
        const key = row + "-" + col
        return tableData.findIndex(data => data.key === key)
      }

      // for each col, add to row
      for (var colIndex = 0; colIndex < colLength; colIndex++) {
        const tableDataNew = findData(dataIndex, colIndex)
        tableRowData.push(tableData[tableDataNew])
      }

      // build row
      tableRow.push(
        <tr
          key={dataIndex}
          className={
            `bg-gray-800 ` +
            (!tableRowIndex && `odd:bg-gray-700 odd:bg-opacity-25`)
          }
        >
          {tableRowData}
        </tr>
      )

      // push to table head or body
      tableRowIndex ? tableHead.push(tableRow) : tableBody.push(tableRow)
    }

    // build table head & body
    table.push(
      <thead key="table-head" className="border-none">
        {tableHead}
      </thead>
    )
    table.push(
      <tbody key="table-body" className="border-none">
        {tableBody}
      </tbody>
    )

    return table
  }

  buildTable = () => {
    const items = this.state.table
    const tableData = this.buildTableBody(items)
    const table = tableData.map(item => {
      return item
    })

    return (
      <>
        <table className="table-auto border border-gray-700">{table}</table>
      </>
    )
  }

  componentDidMount() {
    let Columns = []
    let tableHead = []

    this.props.data.forEach((row, rowIndex) => {
      row.forEach((item, colIndex) => {
        let newArray = {
          active: false,
          col: colIndex,
          row: rowIndex,
          value: item,
        }

        if (rowIndex === 0) {
          tableHead.push(item)
        }

        // Add array Col if none exists
        !Columns[colIndex] && Columns.push([])
        // Push data to col
        Columns[colIndex].push(newArray)
      })
    })

    // Store in state
    this.setState({ table: Columns })
    this.setState({ tableHeadData: tableHead })
  }

  render() {
    return (
      <div
        className="block max-h-full overflow-y-auto "
        style={{ height: "250px" }}
      >
        {/* <button
          onClick={this.handleRamdomAll}
          // disabled={this.state.resultsTimer}
        >
          Random All
        </button> */}
        {this.state.table && this.buildTable()}
      </div>
    )
  }
}
