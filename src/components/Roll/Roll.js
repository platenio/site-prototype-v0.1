import React from "react"

const Roll = ({ children }) => {
  return (
    <div className="bg-black rounded text-gray-100">
      <h3>Roll Component</h3>
      {children}
    </div>
  )
}

export default Roll
