import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import nightOwlLight from "prism-react-renderer/themes/nightOwlLight"
// import nightOwl from "prism-react-renderer/themes/nightOwl"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import { mdx } from "@mdx-js/react"

import {
  Clip,
  Nest,
  Rolltable,
  SecBooks,
  SecAuthors,
  SecPosts,
} from "../Widgets/Widgets"

const scope = {
  mdx,
  Clip,
  Nest,
  Rolltable,
  SecBooks,
  SecAuthors,
  SecPosts,
}
console.log("scope", scope)

const styleTab = "mb-1 table text-xs text-gray-500 leading-none tracking-wide"
const styleLive = "prose py-8 px-4 h-full overflow-hidden"
const styleCode = "h-full text-base leading-normal"
const styleError = "p-4 text-xs text-cmykRed-500 overflow-scroll bg-cmykRed-100"

export default ({ children, className, live, render, full }) => {
  const classes = className || ""
  const matches = classes.match(/language-(?<lang>.*)/)
  const language = matches ? matches.groups.lang : ""
  const grid = full
    ? {
        gridTemplateRows: "auto auto",
      }
    : {
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      }

  if (live && language === ("jsx" || "js")) {
    return (
      <LiveProvider
        code={children.trim()}
        scope={scope}
        transformCode={code => "/** @jsx mdx */" + code}
        language={language}
        theme={nightOwlLight}
      >
        <p className={styleTab}>{language.toUpperCase()}</p>
        <div className="grid max-w-full overflow-hidden" style={grid}>
          <div>
            <LiveEditor className={styleCode} />
            <LiveError className={styleError} />
          </div>
          <div>
            <LivePreview className={styleLive} />
          </div>
        </div>
      </LiveProvider>
    )
  }

  if (render) {
    return (
      <LiveProvider
        code={children.trim()}
        scope={{ mdx }}
        language={language}
        theme={nightOwlLight}
        disabled={true}
      >
        <p className={styleTab}>{language.toUpperCase()}</p>
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          <div>
            <LiveEditor className={styleCode} />
          </div>
          <div>
            {language === ("jsx" || "js") ? (
              <LivePreview className={styleLive} />
            ) : (
              children.trim()
            )}
          </div>
        </div>
      </LiveProvider>
    )
  }

  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={language}
      theme={nightOwlLight}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          <p className={styleTab}>{language.toUpperCase()}</p>
          <pre className={(className, styleCode)} style={{ ...style }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        </>
      )}
    </Highlight>
  )
}
