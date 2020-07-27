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
    const styleHead =
      "p-2 m-0 text-white hover:bg-gray-600 ease-in-out duration-300 cursor-pointer"
    const styleHeadActive = ""
    const styleData = "inline-block p-1 px-2"
    const styleDataActive = "text-gray-900 bg-cmykYellow-500 rounded"
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
            className={styleHead}
          >
            {children.length > 0 && (
              <div
                className={
                  styleData
                  // + ` flex justify-start items-end max-w-full w-48`
                }
              >
                {/* <span className="flex-1"> */}
                {children}
                {/* </span> */}
                {/* <span className="ml-1 text-cmykBlue-500">
                  {this.state.sort ? <FaSortAlphaUp /> : <FaSortAlphaDown />}
                </span> */}
              </div>
            )}
          </th>
        ) : (
          <td
            onClick={() => {
              handleActiveCell(row, col)
            }}
            className={styleHead + ` ` + (active && styleHeadActive)}
          >
            {children.length > 0 && (
              <div className={styleData + ` ` + (active && styleDataActive)}>
                {children}
              </div>
            )}
          </td>
        )}
      </>
    )
  }
}
