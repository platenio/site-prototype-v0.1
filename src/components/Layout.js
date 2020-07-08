import React from "react"

// Layout
import "./Layout.scss"
import Header from "./Header/Header"
import ChaptersSidebar from "./ChaptersSidebar/ChaptersSidebar"
import ActionsSidebar from "./ActionsSidebar/ActionsSidebar"

import LayoutUnderpage from "./Layouts/Underpage"
import LayoutBook from "./Layouts/Book"
import LayoutChapter from "./Layouts/Chapter"

export default function Layout({ context, data, children }) {
  const { id, body, frontmatter } = data.file.childMdx
  const { slug } = data.file.fields
  const {
    title,
    author,
    blurb,
    features,
    date,
    published,
    last_updated,
    tags,
    featureImg,
  } = frontmatter

  const bgImage = featureImg
    ? featureImg.childImageSharp.fluid.src
    : "https://cdn.cnn.com/cnnnext/dam/assets/180724145139-stalenhag-kersnuten-full-169.jpg"

  return (
    <div className="text-gray-700 antialiased leading-tight bg-black">
      <span
        className="fixed top-0 left-0 w-full h-screen"
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
        <div class="flex justify-center items-start w-full">
          {/* Layout Wrapper */}
          <div
            id="layout-frame"
            className="flex flex-col max-w-full h-screen bg-white bg-opacity-90 border-l-3 border-r-3 border-gray-900"
          >
            <div className="relative z-50 w-full border-b-3 border-gray-700">
              <Header />
            </div>

            <div className="flex-auto flex flex-wrap lg:flex-no-wrap justify-center items-stretch w-full overflow-auto">
              {context.type === "chapter" && (
                <div className="flex-1 sm:flex-initial lg:flex-none  px-2 w-full sm:w-64 max-w-full border-r-3 border-gray-900">
                  <div className="h-full overflow-hidden">
                    <ChaptersSidebar />
                  </div>
                </div>
              )}

              <main
                className="flex-auto sm:flex-1 lg:flex-auto bg-white"
                style={{ width: "960px", maxWidth: "100%" }}
              >
                <div className="h-full py-8 md:py-16 px-8 overflow-auto">
                  <div className="max-w-2xl mx-auto">
                    {context.type === "page" && (
                      <LayoutUnderpage>{children}</LayoutUnderpage>
                    )}
                    {context.type === "book" && (
                      <LayoutBook
                        slug={slug}
                        title={title}
                        blurb={blurb}
                        author={author}
                        published={published}
                        featureImg={featureImg}
                        features={features}
                      >
                        {children}
                      </LayoutBook>
                    )}
                    {context.type === "chapter" && (
                      <LayoutChapter>{children}</LayoutChapter>
                    )}

                    {/* <hr className="my-16" /> */}
                    {/* <pre>{JSON.stringify(context, null, 4)}</pre> */}
                    {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
                  </div>
                </div>
              </main>

              {context.type === "chapter" && (
                <div className="flex-1 sm:flex-initial lg:flex-none px-2 w-full lg:w-64 max-w-full  flex justify-start xl:justify-start items-start border-l-3 border-gray-900">
                  <div className="text-gray-900 h-full w-full overflow-hidden">
                    <ActionsSidebar />
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
