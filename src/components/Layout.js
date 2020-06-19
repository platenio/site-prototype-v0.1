import React from "react"

// Layout
import "./Layout.scss"
import Header from "./Header/Header"

export default function Layout({ children }) {
  return (
    <div className="text-gray-900 antialiased leading-tight">
      <div className="container mx-auto px-8 py-16">
        <Header />

        <main>{children}</main>
      </div>
    </div>
  )
}
