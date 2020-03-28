import React from "react"
import { youtubeLink, youtubePlaceholder } from "../config"
import Img from "gatsby-image"
export default function Youtube() {
  return (
    <iframe
      style={{ height: "100%", flex: 1, width: "100%" }}
      title="Service Playlist Video"
      src={youtubeLink}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  )
}
