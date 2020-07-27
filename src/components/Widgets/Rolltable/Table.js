import React, { Component } from "react"

import TableCell from "./TableCell.js"

export default class Table extends Component {
  constructor(props) {
    super(props)

    this.state = {
      table: false,
      tableCols: false,
      results: [],
    }
  }

  handleRandomCell = currentCol => {
    const rowLength = this.state.table[currentCol].length
    const rowMin = Math.ceil(0)
    const rowMax = Math.floor(rowLength)
    const randomRow = Math.floor(Math.random() * (rowMax - rowMin) + rowMin)

    this.handleActiveCell(randomRow, currentCol)
  }

  handleActiveCell = (row, col) => {
    // create table clone
    let table = [...this.state.table]
    const colLength = table.length
    const activeValue = table[col][row].value

    // Clear all active children
    table[col].forEach(data => {
      data.active = false
    })
    // Active selected child
    table[col][row].active = true

    console.log("table")

    // Update table
    this.setState({ table: table })

    this.handleResultsUpdate(activeValue, col, colLength)
  }

  handleResultsUpdate = (newValue, col, colLength) => {
    let resultsTemplate = []
    let newResults = [...this.state.results]

    for (var i = 0; i < colLength; i++) {
      !newResults[i] &&
        (newResults[i] = <span className="text-cmykRed-100">__</span>)
      if (col === 1 && newValue === "") {
        newResults[i] = <span className="text-cmykRed-100">__</span>
      }
      col === i && (newResults[i] = newValue)
    }

    newResults.forEach((item, i) => {
      console.log("item", i)
      resultsTemplate.push(
        <div className="flex-auto mb-1 ml-1 w-40 bg-gray-100">
          <div
            className="flex justify-center p-2 items-start h-full cursor-pointer hover:text-cmykBlue-500 hover:bg-cmykBlue-100 active:bg-cmykBlue-200 select-none"
            onClick={() => this.handleRandomCell(i)}
          >
            <span>{item}</span>
          </div>
        </div>
      )
    })

    console.log("newResults", newResults)
    console.log("resultsTemplate", resultsTemplate)

    this.setState({ results: newResults })
    this.props.handleResults(
      <div className="break-word flex flex-wrap justify-center items-stretch mt-1 mr-1 -mb-1 -ml-1">
        {resultsTemplate}
      </div>
    )
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

      // for each col, add to row
      for (var colIndex = 0; colIndex < colLength; colIndex++) {
        const key = dataIndex + "-" + colIndex
        const data = tableData.findIndex(data => data.key === key)

        tableRowData.push(tableData[data])
      }

      // build row
      tableRow.push(
        <tr className={`bg-gray-800 ` + (!tableRowIndex && `odd:bg-gray-700`)}>
          {tableRowData}
        </tr>
      )

      // push to table head or body
      tableRowIndex ? tableHead.push(tableRow) : tableBody.push(tableRow)
    }

    // build table head & body
    table.push(<thead className="bg-gray-900 border-none">{tableHead}</thead>)
    table.push(<tbody className="border-none">{tableBody}</tbody>)

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
        <table className="table-auto text-gray-900 bg-white">{table}</table>
      </>
    )
  }

  componentDidMount() {
    let Columns = []

    this.props.data.forEach((row, rowIndex) => {
      row.forEach((item, colIndex) => {
        let newArray = {
          active: false,
          col: colIndex,
          row: rowIndex,
          value: item,
        }

        // Add array Col if none exists
        !Columns[colIndex] && Columns.push([])

        // Push data to col
        Columns[colIndex].push(newArray)
      })
    })

    // Store in state
    this.setState({ table: Columns })
  }

  render() {
    return (
      <div
        className="block max-h-full overflow-scroll"
        style={{ height: "400px" }}
      >
        {this.state.table && this.buildTable()}
      </div>
    )
  }
}
