import React from "react"
import { Link } from "gatsby"

const Sitemap = () => {
  return (
    <header className="pb-8 mb-8 border-b border-gray-300">
      {/* <img src="https://i.imgur.com/iqDDsDo.jpg" alt="" /> */}
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <Link to="/" className="no-underline text-4xl font-bold">
            Platen
          </Link>
        </div>
        <nav className="table">
          <ul className="float-left grid grid-flow-col gap-4">
            <li>
              <Link
                className="link-header"
                activeClassName="link-header-active"
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="link-header"
                activeClassName="link-header-active"
                to="/specimen"
              >
                Specimen
              </Link>
            </li>
            <li>
              <Link
                className="link-header"
                activeClassName="link-header-active"
                to="/styleguide"
              >
                Styleguide
              </Link>
            </li>
            <li>
              <Link
                className="link-header"
                activeClassName="link-header-active"
                to="/404"
              >
                404
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Sitemap
