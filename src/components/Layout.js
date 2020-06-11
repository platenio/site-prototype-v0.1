import React from "react"

// Layout
import "./layout.scss"
import Header from "./Header/Header"

export default function Layout({ children }) {
  return (
    <div className="text-gray-900 antialiased leading-tight">
      <div className="container mx-auto px-8 py-16">
        <Header />

        {children}
      </div>
    </div>
  )
}
