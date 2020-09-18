export function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function getRandomEntry(tableName, column) {
  console.log("getRandomEntry")
  let table = getRollTable(tableName)
  let rows = table.rows.length
  clearSelectedEntries(tableName, column)
  let entry = table.rows[getRandomInteger(1, rows)].cells[column]
  // console.log(
  //   `${table.rows[0].cells[column].textContent}: ${entry.textContent}`
  // )
  entry.classList.add("selected")
  setResultText(tableName)
}

export function getRandomEntries(tableName) {
  console.log("getRandomEntries")
  let table = getRollTable(tableName)
  let columns = table.rows[0].cells.length
  let i
  for (i = 1; i < columns; i++) {
    getRandomEntry(tableName, i)
  }
  setResultText(tableName)
}

export function getRollTable(name) {
  return document.querySelector(`table#rolltable-${name}`)
}

export function selectEntry(tableName, row, column) {
  let table = getRollTable(tableName)
  clearSelectedEntries(tableName, column)
  table.rows[row].cells[column].classList.add("selected")
  setResultText(tableName)
}

export function clearSelectedEntries(tableName, column = null) {
  let selectedEntries = getSelectedEntries(tableName, column)
  for (let entry of selectedEntries) {
    entry.classList.remove("selected")
  }
  setResultText(tableName)
}

export function getSelectedEntries(tableName, column = null) {
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

export function setResultText(tableName) {
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
  // result.innerText = text.replace(" ,", ",").replace(" .", ".")
}
