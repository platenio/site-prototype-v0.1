import React from "react"
import { Link } from "gatsby"

import Clip from "./Clip"
import Nest from "./Nest"
import Rolltable from "./Rolltable/Rolltable"
import SecBooks from "./Sec/Books"
import SecAuthors from "./Sec/Authors"
import SecPosts from "./Sec/Posts"
import CodeBlock from "./CodeBlock"

const shortcodes = {
  Link,
  pre: props => <div className="pre" {...props} />,
  code: CodeBlock,

  // Widgets
  Clip: props => <Clip {...props} />,
  Nest: props => <Nest {...props} />,
  Rolltable: props => <Rolltable {...props} />,
  SecAuthors: props => <SecAuthors {...props} />,
  SecBooks: props => <SecBooks {...props} />,
  SecPosts: props => <SecPosts {...props} />,
}

export { shortcodes, Clip, Nest, Rolltable, SecBooks, SecAuthors, SecPosts }
