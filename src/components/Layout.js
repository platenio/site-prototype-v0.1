import React from "react"
// import tw, { styled } from "twin.macro"

// Layout
import "../Style.scss"
// import "./Layout.scss"
import Header from "./Header/Header"

export default function Layout({
  children,
  featureImg,
  sidebarLeft,
  sidebarRight,
}) {
  const bgImage = featureImg
    ? featureImg
    : "https://cdn.cnn.com/cnnnext/dam/assets/180724145139-stalenhag-kersnuten-full-169.jpg"

  return (
    <div className="text-gray-700 antialiased leading-tight bg-white">
      <span
        className="fixed top-0 left-0 w-full h-screen opacity-10"
        style={{
          WebkitFilter: "grayscale(100%) contrast(100%) brightness(150%)",
          filter: "grayscale(100%) contrast(100%) brightness(150%)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundImage: `url(` + bgImage + `)`,
        }}
      ></span>
      <div className="relative flex flex-col justify-start items-start min-h-full">
        {/* Keep content centered */}
        <div className="flex justify-center items-start w-full">
          {/* Layout Wrapper */}
          <div
            id="layout-frame"
            className="flex flex-col max-w-full h-screen bg-opacity-90"
          >
            <div className="relative z-50 w-full">
              <div className="max-w-full mx-auto" style={{ width: "97.5ch" }}>
                <Header />
              </div>
            </div>

            <div className="flex-auto flex flex-wrap lg:flex-no-wrap justify-center items-stretch w-full overflow-auto border-3 border-gray-900">
              {sidebarLeft && (
                <div className="flex-1 sm:flex-initial lg:flex-none w-full sm:w-64 max-w-full text-white bg-gray-900">
                  <div className="h-full overflow-x-hidden">{sidebarLeft}</div>
                </div>
              )}

              <main
                className="flex-auto sm:flex-1 lg:flex-auto max-w-full bg-gray-100 overflow-y-scroll overflow-x-hidden border-3 border-white"
                style={{ width: "97.5ch" }}
              >
                <div className="h-full">
                  <article className="px-8 py-8 md:py-16">{children}</article>
                </div>
              </main>

              {sidebarRight && (
                <div className="flex-1 sm:flex-initial lg:flex-none px-2 w-full lg:w-64 max-w-full  flex justify-start xl:justify-start items-start">
                  <div className="text-gray-900 h-full w-full overflow-hidden">
                    {sidebarRight}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
