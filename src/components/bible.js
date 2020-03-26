import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default function Youtube() {
  const data = useStaticQuery(graphql`
    query BibleReadingQuery {
      site {
        siteMetadata {
          bibleReading
        }
      }
    }
  `)
  return (
    <iframe
      style={{ height: "100%", flex: 1, width: 450 }}
      title="Bible Reading"
      src={"https://chop.bible.com/" + data.site.siteMetadata.bibleReading}
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  )
}
