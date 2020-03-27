import React from "react"
import { bibleReading } from "../config"

export default function Youtube() {
  return (
    <iframe
      style={{ height: "100%", flex: 1, width: 450 }}
      title="Bible Reading"
      src={"https://chop.bible.com/" + bibleReading}
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  )
}
