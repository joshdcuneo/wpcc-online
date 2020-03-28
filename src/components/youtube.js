import React from "react"
import { youtubeLink } from "../config"

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
