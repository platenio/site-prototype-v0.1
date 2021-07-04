import React from "react"
import { Link } from "gatsby"

// import HeaderLinks from "./HeaderLinks"
import Logo from "../../img/platen_logo.svg"

const Header = () => {
  return (
    <header
      id="Header"
      className="flex flex-wrap md:flex-no-wrap justify-center md:justify-start items-end p-8 pb-4"
    >
      <div className="flex-initial md:flex-1 mb-2 md:mb-0">
        <h1 className="inline-block m-0 text-4xl">
          <Link to="/" className="no-underline">
            <img src={Logo} alt="Logo" className="w-40 max-w-full" />
            <span className="sr-only">Platen.io</span>
          </Link>
        </h1>
      </div>

      <div className="flex-initial flex justify-center m-0 w-full md:w-auto">
        {/* <HeaderLinks /> */}
      </div>
    </header>
  )
}

export default Header
