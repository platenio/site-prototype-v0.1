import React from "react"

import { FaHistory } from "react-icons/fa"

const ActionsSidebar = () => {
  return (
    <div id="ActionsSidebar" className="pt-8 pb-2">
      <h3>
        Recent Actions <FaHistory className="float-right" />
      </h3>

      <ul className="flex flex-wrap justify-start items-stretch  mt-2 pt-2 text-xs border-t-3 border-gray-900 bg-white">
        <li className="w-full bg-gray-100 p-2">HH:MM:SS, Component action</li>
        <li className="w-full bg-gray-200 p-2">HH:MM:SS, Component action</li>
        <li className="w-full bg-gray-100 p-2">HH:MM:SS, Component action</li>
        <li className="w-full bg-gray-200 p-2">HH:MM:SS, Component action</li>
      </ul>
    </div>
  )
}

export default ActionsSidebar
