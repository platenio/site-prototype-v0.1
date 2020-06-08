import React from "react"
import fetch from "sync-fetch"
import parse from "csv-parse/lib/sync"

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function getRandomEntry(tableName, column) {
  let table = getRollTable(tableName)
  let rows = table.rows.length
  clearSelectedEntries(tableName, column)
  let entry = table.rows[getRandomInteger(1,rows)].cells[column]
  console.log(`${table.rows[0].cells[column].textContent}: ${entry.textContent}`)
  entry.classList.add("selected")
  setResultText(tableName)
}

function getRandomEntries(tableName) {
  let table = getRollTable(tableName)
  let columns = table.rows[0].cells.length
  let i
  for (i = 1; i < columns; i++) {
    getRandomEntry(tableName, i)
  }
  setResultText(tableName)
}

function getRollTable(name) {
  return document.getElementById(`rolltable-${name}`);
}

function selectEntry(tableName, row, column) {
  let table = getRollTable(tableName);
  clearSelectedEntries(tableName, column)
  table.rows[row].cells[column].classList.add("selected");
  setResultText(tableName);
}

function clearSelectedEntries(tableName, column=null) {
  let selectedEntries = getSelectedEntries(tableName,column);
  for (let entry of selectedEntries) {
    entry.classList.remove("selected");
  }
  setResultText(tableName);
}

function getSelectedEntries(tableName, column=null) {
  let table = getRollTable(tableName);
  let selectedEntries = [];
  for (let row of table.rows) {
    if (column == null) {
      for (let entry of row.cells) {
        if (entry.classList.contains("selected")) {
          selectedEntries.push(entry);
        }
      }
    } else {
      let entry = row.cells[column]
      if (entry.classList.contains("selected")) {
        selectedEntries.push(entry);
      }
    }
  }
  return selectedEntries;
}

function setResultText(tableName) {
  let table = getRollTable(tableName);
  let result = table.caption.children[1];
  let entries = []

  let columnCount = table.rows[0].cells.length;
  let i;
  for (i = 1; i < columnCount; i++) {
    entries.push(getSelectedEntries(tableName, i));
  }
  entries = entries.flat(2)

  let text = ""
  for (let entry of entries) {
    text += `${entry.dataset.prefix} ${entry.textContent}`
  }
  text += "."
  // Why is this hack necessary???
  result.textContent = text.replace(' ,',',').replace(' .','.')
}

function toggleTableCollapse(tableName) {
  let collapser = document.getElementById(`rolltable-${tableName}-collapser`)
  let table = getRollTable(tableName);
  let body = table.lastElementChild;

  body.hidden = !body.hidden;

  // Toggle the button view, which is a font-awesome icon declaration
  if (collapser.firstElementChild.className.match("down")) {
    collapser.firstElementChild.className = "fas fa-caret-right";
  } else {
    collapser.firstElementChild.className = "fas fa-caret-down";
  }
}

export default function Rolltable(props) {
  const records = parse(fetch(props.src).text())
  const headers = records[0]
  const prefixes = records[1]
  const entries  = records.slice(2)

  const header_elements = []
  const header_class = "hover:bg-primary-100 px-5 py-2"
  for (const [index, header] of headers.entries()) {
    if (index === 0) {
      header_elements.push(<th key={index} onClick={() => getRandomEntries(props.name)} onKeyPress={() => getRandomEntries(props.name)} className={header_class}>{header}</th>)
    } else {
      header_elements.push(<th key={index} onClick={() => getRandomEntry(props.name, index)} onKeyPress={() => getRandomEntry(props.name, index)}  className={header_class}>{header}</th>)
    }
  }

  const entry_elements = []
  for (const [row_index, row_data] of entries.entries()) {
    let elements = []
    for (const [index, entry] of row_data.entries()) {
      elements.push(<td key={index} className="hover:bg-primary-400 hover:font-bold hover:text-white px-3 py-1" data-prefix={prefixes[index]} onClick={() => selectEntry(props.name, (row_index + 1), index)} onKeyPress={() => selectEntry(props.name, (row_index + 1), index)}>{entry}</td>)
    }
    entry_elements.push(<tr key={row_index} className="even:bg-primary-100">{elements}</tr>)
  }

  return (
    <table className="rolltable w-full" id={`rolltable-${props.name}`}>
      <caption>
        <p>
          <button onClick={() => toggleTableCollapse(props.name)} id={`rolltable-${props.name}-collapser`} classname="w-5 bg-primary-500"><i className="fas fa-caret-down"></i></button>
          {props.caption} Click on the <strong>Result</strong> header to roll automatically. Click on any other header to reroll for that column.
        </p>
        <p className="result text-bold" id={`result-${props.name}`}></p>
      </caption>
      <thead className="bg-primary-500 text-white text-bold">
        <tr>
          {header_elements}
        </tr>
      </thead>
      <tbody>
        {entry_elements}
      </tbody>
    </table>
  )
}
