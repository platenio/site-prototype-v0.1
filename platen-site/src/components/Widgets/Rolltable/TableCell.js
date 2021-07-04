import React, { Component } from "react"

// import { FaSortAlphaUp, FaSortAlphaDown } from "react-icons/fa"

export default class TableCell extends Component {
  render() {
    const styleCell = "m-0"
    const styleCellBase =
      "text-gray-500 leading-none transition-color ease-in-out duration-300 cursor-pointer"
    const styleTHCell =
      styleCellBase +
      " pt-2 pb-1 border-r border-gray-700 hover:text-white hover:bg-gray-700 select-none"

    const styleTDCell =
      styleCellBase + " p-1 border-t border-r border-gray-700 hover:bg-gray-900"
    // const styleTDActive = ""

    const styleTDSpan = "block p-1"
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
          <th className={styleCell}>
            {children.length > 0 && (
              <div
                className={styleTHCell}
                tabIndex="0"
                role="button"
                onClick={() => handleRandomCell(col)}
                onKeyPress={e => handleRandomCell(col, e)}
              >
                <span className={styleTDSpan}>{children}</span>
              </div>
            )}
          </th>
        ) : (
          <td className={styleCell}>
            {children.length > 0 && (
              <div
                className={styleTDCell}
                onClick={() => handleActiveCell(row, col)}
                onKeyPress={e => handleActiveCell(row, col, e)}
                role="button"
                tabIndex="0"
              >
                <span
                  className={styleTDSpan + ` ` + (active && styleTDSpanActive)}
                >
                  {children}
                </span>
              </div>
            )}
          </td>
        )}
      </>
    )
  }
}
