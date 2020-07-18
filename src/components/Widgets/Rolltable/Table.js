import React, { Component } from "react"

export default class Table extends Component {
  constructor(props) {
    super(props)

    this.state = {
      table: false,
    }
  }

  buildTable = () => {
    let table
    // let tableHead
    // let tableBody

    this.state.table.forEach(col => {
      let tableItem
      col.forEach(
        (item, i) =>
          (tableItem = (
            <tbody>
              {i === 0 ? (
                <th key={i}>TH {item.value}</th>
              ) : (
                <td key={i}>TD {item.value}</td>
              )}
            </tbody>
          ))
      )
      table = <tr>{tableItem}</tr>
    })

    return table
  }

  componentDidMount() {
    const { data } = this.props
    let Columns = []

    // Build table array by columns
    data.forEach(row => {
      row.forEach((item, colIndex) => {
        let newArray = {
          active: false,
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
      <div className="p-4">
        {/*  */}

        <table className="bg-gray-100 text-gray-900">
          <tbody>
            {/* {this.state.table && (
              <pre>{JSON.stringify(this.state.table, null, 4)}</pre>
            )} */}
            {this.state.table && this.buildTable()}
            {/* {this.state.table.map(col => {
              col.forEach((item, i) => {
                return <td key={i}>{item.value}</td>
              })
            })} */}
          </tbody>
        </table>
      </div>
    )
  }
}
