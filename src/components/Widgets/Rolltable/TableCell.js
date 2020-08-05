import React, { Component } from "react"

// import { FaSortAlphaUp, FaSortAlphaDown } from "react-icons/fa"

export default class TableCell extends Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   activeHead: false,
    //   activeCell: false,
    // }
  }

  render() {
    const styleBase =
      "m-0 text-gray-500 leading-none transition-color ease-in-out duration-300 cursor-pointer"

    const styleTH =
      styleBase +
      " pt-2 pb-1 border-r border-gray-700 hover:text-white hover:bg-gray-700 select-none"

    const styleTD =
      styleBase + " p-1 border-t border-r border-gray-700 hover:bg-gray-900"
    // const styleTDActive = ""

    const styleTDSpan = "p-1"
    const styleTDSpanActive =
      "text-gray-900 bg-cmykYellow-500 hover:bg-cmykYellow-200 rounded-sm"

    // = `bg-cmykRed-500 hover:bg-cmykRed-400 rounded-sm`

    const {
      // key,
      row,
      col,
      thead,
      active,
      handleActiveCell,
      handleRandomCell,
      children,
    } = this.props

    return (
      <>
        {thead ? (
          <th
            onClick={() => {
              handleRandomCell(col)
            }}
            className={styleTH}
          >
            {children.length > 0 && (
              <div className={styleTDSpan}>{children}</div>
            )}
          </th>
        ) : (
          <td
            onClick={() => {
              handleActiveCell(row, col)
            }}
            className={styleTD}
          >
            {children.length > 0 && (
              <div
                className={styleTDSpan + ` ` + (active && styleTDSpanActive)}
              >
                {children}
              </div>
            )}
          </td>
        )}
      </>
    )
  }
}
