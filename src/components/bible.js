import React from "react"
import { bibleReading } from "../config"

export default function Bible() {
  return (
    <iframe
      style={{ height: "100%", flex: 1, width: 450, maxWidth: "100%" }}
      title="Bible Reading"
      src={"https://chop.bible.com/" + bibleReading}
      frameBorder="0"
    ></iframe>
  )
}
