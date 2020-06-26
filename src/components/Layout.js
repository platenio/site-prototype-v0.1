import React from "react"

// Layout
import "./Layout.scss"
import Sidebar from "./Sidebar/Sidebar"

export default function Layout({ children }) {
  return (
    <div className="text-gray-900 antialiased leading-tight">
      <span
        className="fixed top-0 left-0 w-full h-screen"
        style={{
          backgroundRepeat: "none",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundImage:
            "url(https://cdn.vox-cdn.com/thumbor/78Wm0Nc8uozUl4lc9mRgmIHXhhY=/0x610:1280x1280/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/8799603/tumblr_om101cfekn1rc69zjo4_1280.jpg)",
        }}
      ></span>
      <div className="relative flex flex-col justify-start items-start min-h-full">
        {/* Keep content centered */}
        <div class="flex justify-center items-start w-full">
          {/* h-screen  overflow-auto */}

          {/* Layout Wrapper */}
          <div
            id="layout-frame"
            className="flex flex-wrap lg:flex-no-wrap justify-center items-stretch h-screen w-full p-1 bg-gray-900 bg-opacity-75"
          >
            <div className="flex-auto lg:flex-none lg:flex-none max-w-full w-full lg:w-64">
              <div className=" text-white h-full overflow-hidden">
                <Sidebar />
              </div>
            </div>

            <main
              className="flex-auto sm:flex-1 lg:flex-initial m-2"
              style={{ width: "1200px", maxWidth: "100%" }}
            >
              <div className="h-full py-8 md:py-16 px-8 bg-gray-100 rounded shadow-2xl overflow-auto">
                <div className="max-w-2xl mx-auto">{children}</div>
              </div>
            </main>

            <div className="flex-1 sm:flex-initial lg:flex-none max-w-full w-full sm:w-64  flex justify-start xl:justify-start items-start">
              <div className=" text-white h-full overflow-hidden">
                <div className="p-4">
                  <h2>Modulebar</h2>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Officiis labore mollitia doloremque, maiores quisquam natus
                    reiciendis animi, nobis dolore quibusdam in? Quas suscipit
                    accusamus aut, assumenda nemo eveniet corporis quisquam?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
