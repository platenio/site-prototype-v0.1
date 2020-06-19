import React, { Component } from "react"

// function getRandomInteger(min, max) {
//   return Math.floor(Math.random() * (max - min)) + min
// }

// function getRandomEntry(tableName, column) {
//   let table = getRollTable(tableName)
//   let rows = table.rows.length
//   clearSelectedEntries(tableName, column)
//   let entry = table.rows[getRandomInteger(1, rows)].cells[column]
//   console.log(
//     `${table.rows[0].cells[column].textContent}: ${entry.textContent}`
//   )
//   entry.classList.add("selected")
//   setResultText(tableName)
// }

// function getRandomEntries(tableName) {
//   console.log("getRandomEntries")

//   let table = getRollTable(tableName)
//   let columns = table.rows[0].cells.length
//   let i
//   for (i = 1; i < columns; i++) {
//     getRandomEntry(tableName, i)
//   }
//   setResultText(tableName)
// }

// function getRollTable(name) {
//   return document.querySelector(`table#rolltable-${name}`)
// }

// function selectEntry(tableName, row, column) {
//   let table = getRollTable(tableName)
//   clearSelectedEntries(tableName, column)
//   table.rows[row].cells[column].classList.add("selected")
//   setResultText(tableName)
// }

// function clearSelectedEntries(tableName, column = null) {
//   let selectedEntries = getSelectedEntries(tableName, column)
//   for (let entry of selectedEntries) {
//     entry.classList.remove("selected")
//   }
//   setResultText(tableName)
// }

// function getSelectedEntries(tableName, column = null) {
//   let table = getRollTable(tableName)
//   let selectedEntries = []
//   for (let row of table.rows) {
//     if (column == null) {
//       for (let entry of row.cells) {
//         if (entry.classList.contains("selected")) {
//           selectedEntries.push(entry)
//         }
//       }
//     } else {
//       let entry = row.cells[column]
//       if (entry.classList.contains("selected")) {
//         selectedEntries.push(entry)
//       }
//     }
//   }
//   return selectedEntries
// }

// function setResultText(tableName) {
//   let table = getRollTable(tableName)
//   let result = document.querySelector("#result-" + tableName + " p")
//   let entries = []

//   let columnCount = table.rows[0].cells.length
//   let i
//   for (i = 1; i < columnCount; i++) {
//     entries.push(getSelectedEntries(tableName, i))
//   }
//   entries = entries.flat(2)

//   let text = ""
//   for (let entry of entries) {
//     text += `${entry.dataset.prefix} ${entry.innerText}`
//   }
//   text += "."
//   // Why is this hack necessary???
//   result.innerText = text.replace(" ,", ",").replace(" .", ".")
// }

// ============

// const header_elements = []
// const header_class = "hover:bg-tertiary-400 px-5 py-2"
// // for (const [index, header] of headers.entries()) {
// //   if (index === 0) {
// //     header_elements.push(
// //       <th
// //         key={index}
// //         onClick={() => getRandomEntries(tableName)}
// //         onKeyPress={() => getRandomEntries(tableName)}
// //         className={header_class}
// //       >
// //         {header}
// //       </th>
// //     )
// //   } else {
// //     header_elements.push(
// //       <th
// //         key={index}
// //         onClick={() => getRandomEntry(tableName, index)}
// //         onKeyPress={() => getRandomEntry(tableName, index)}
// //         className={header_class}
// //       >
// //         {header}
// //       </th>
// //     )
// //   }
// // }

// const entry_elements = []
// // for (const [row_index, row_data] of entries.entries()) {
// //   let elements = []
// //   for (const [index, entry] of row_data.entries()) {
// //     elements.push(
// //       <td
// //         key={index}
// //         className="hover:bg-tertiary-400 hover:text-white px-3 py-1"
// //         data-prefix={prefixes[index]}
// //         onClick={() => selectEntry(tableName, row_index + 1, index)}
// //         onKeyPress={() => selectEntry(tableName, row_index + 1, index)}
// //       >
// //         {entry}
// //       </td>
// //     )
// //   }
// //   entry_elements.push(
// //     <tr key={row_index} className="even:bg-tertiary-100">
// //       {elements}
// //     </tr>
// //   )
// // }

export default class Rolltable extends Component {
  render() {
    const { name } = this.props

    return (
      <table id={`rolltable-${name}`} className="w-full">
        {name}
        <thead className="bg-tertiary-500 text-white text-bold cursor-pointer">
          {/* <tr>{header_elements}</tr> */}
        </thead>

        {/* <tbody>{entry_elements}</tbody> */}
      </table>
    )
  }
}
