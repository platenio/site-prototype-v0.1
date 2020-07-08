import React from "react"
import { Link } from "gatsby"

import NavLink from "./NavLink"
import NavNest from "./NavNest"

const Header = () => {
  return (
    <div
      id="Header"
      className="flex flex-wrap md:flex-no-wrap justify-center md:justify-start items-end px-4 pt-8 pb-4"
    >
      <div className="flex-initial md:flex-1 mb-2 md:mb-0">
        <h1 className="inline-block m-0 text-4xl">
          <Link to="/" className="no-underline">
            Platen<span className="opacity-75">.io</span>
          </Link>
        </h1>
      </div>

      <menu className="flex-initial flex justify-center m-0 w-full md:w-auto">
        <ul className="flex flex-wrap justify-start items-end">
          <NavLink path="/" title="Home" />

          <NavNest title="Books" path="/books/">
            <NavLink path="/books/platen/" />
            <NavLink path="/books/cyberpunk/" />
          </NavNest>

          {/* <NavLink path="/" title="About" /> */}
          <NavLink path="/contact/" title="Contact" />

          <NavNest title="Dev" title="DEV">
            <NavLink path="/developer/styleguide/" title="Styleguide" />
            <NavLink path="/developer/components/" title="Components" />
            <NavLink path="/developer/specimen/" title="Specimen" />
            <NavLink path="/developer/todo/" title="Todo" />
          </NavNest>
        </ul>
      </menu>
    </div>
  )
}

export default Header
