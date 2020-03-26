import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default function Youtube() {
  const data = useStaticQuery(graphql`
    query YoutubeLinkQuery {
      site {
        siteMetadata {
          youtubeLink
        }
      }
    }
  `)
  return (
    <iframe
      style={{ height: "100%", flex: 1, width: "100%" }}
      title="Service Playlist Video"
      src={data.site.siteMetadata.youtubeLink}
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  )
}
