import React, { useState, useRef, useEffect } from "react"
import { youtubePlaylistId } from "../config"
import Img from "gatsby-background-image"
import { useStaticQuery, graphql } from "gatsby"
import YouTubeIcon from "@material-ui/icons/YouTube"
import Icon from "@material-ui/core/Icon"
import { CircularProgress, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(() => ({
  icon: {},
  videoWrapper: {
    height: "100%",
    flex: 1,
    width: "100%",
    backgroundColor: "black",
    position: "relative",
    overflow: "hidden",
  },
  progressWrapper: {
    position: "absolute",
    top: "50%",
    right: "50%",
    transform: "translateX(50%) translateY(-50%)",
  },
  progress: {
    color: "#fff",
  },
  iframe: props => ({
    height: "100%",
    flex: 1,
    width: "100%",
    zIndex: 2,
    transform: props.iframeLoaded ? "translateX(0%)" : "translateX(200%)",
  }),
  imageWrapper: {
    height: "100%",
    flex: 1,
    width: "100%",
    backgroundColor: "black",
  },
  img: {
    height: "100%",
    flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundPosition: "center",
    backgroundSize: "contain",
  },
  iconWrapper: ({ hovered }) => ({
    height: 100,
    width: 100,
    position: "relative",
    opacity: hovered ? 1 : 0.8,
  }),
  icon1: {
    backgroundColor: "#fff",
    position: "absolute",
    top: "50%",
    right: "50%",
    transform: "translateX(50%) translateY(-50%)",
    height: 40,
    width: 50,
    zIndex: 1,
  },
  icon2: ({ hovered }) => ({
    height: 100,
    width: 100,
    color: hovered ? "red" : "black",
    zIndex: 2,
    position: "absolute",
    top: "50%",
    right: "50%",
    transition: "all 100ms",
    transform: "translateX(50%) translateY(-50%)",
  }),
}))

export default function Youtube() {
  const [showVideo, setShowVideo] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const classes = useStyles({ iframeLoaded, hovered })
  const data = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "placeholder.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 2000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  if (showVideo) {
    return (
      <div className={classes.videoWrapper}>
        {!iframeLoaded && (
          <div className={classes.progressWrapper}>
            <CircularProgress
              className={classes.progress}
              size={70}
              thickness={4}
            />
          </div>
        )}
        <YoutubePlayer
          onLoad={() => setIframeLoaded(true)}
          className={classes.iframe}
        />
      </div>
    )
  }
  return (
    <div
      role="button"
      className={classes.imageWrapper}
      onClick={() => setShowVideo(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={() => setShowVideo(true)}
      tabIndex="0"
      style={{
        height: "100%",
        flex: 1,
        width: "100%",
        backgroundColor: "black",
      }}
    >
      <Img
        fluid={data.image.childImageSharp.fluid}
        className={classes.img}
        style={{ width: "100%" }}
      >
        <Icon className={classes.iconWrapper}>
          <div className={classes.icon1}></div>
          <YouTubeIcon className={classes.icon2} />
        </Icon>
      </Img>
    </div>
  )
}

function YoutubePlayer({ onLoad, className }) {
  const scriptMounted = useRef(false)
  const [youtubeReady, setYoutubeReady] = useState(false)
  const targetElement = useRef()
  const playerRef = useRef()
  useEffect(() => {
    let timeoutId
    if (!scriptMounted.current) {
      global.onYouTubeIframeAPIReady = () => {
        console.log("Youtube api ready")
        setYoutubeReady(true)
      }
      const script = document.createElement("script")
      script.src = "https://www.youtube.com/iframe_api"
      document.body.appendChild(script)
      scriptMounted.current = true
    }
    if (youtubeReady && Boolean(global.YT) && targetElement) {
      const YT = global.YT
      playerRef.current = new YT.Player(targetElement.current, {
        events: {
          onReady: () => {
            console.log("Youtube player ready")
            playerRef.current.playVideo()
            timeoutId = setTimeout(() => onLoad(playerRef), 1000)
          },
        },
        height: "100%",
        width: "100%",
        playerVars: {
          listType: "playlist",
          list: youtubePlaylistId,
          rel: 0,
        },
      })
    }
    return () => clearTimeout(timeoutId)
  }, [onLoad, youtubeReady])
  return <div ref={targetElement} className={className}></div>
}
