import React, { useState } from "react"
import { youtubeLink } from "../config"
import Img from "gatsby-background-image"
import { useStaticQuery, graphql } from "gatsby"
import YouTubeIcon from "@material-ui/icons/YouTube"
import Icon from "@material-ui/core/Icon"
import { CircularProgress, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
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
  button: {
    border: "none",
    height: "100%",
    flex: 1,
    width: "100%",
    margin: 0,
    padding: 0,
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
  iconWrapper: {
    height: 100,
    width: 100,
    position: "relative",
    opacity: 0.8,
    "&:hover": {
      opacity: 1,
    },
  },
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
  icon2: {
    height: 100,
    width: 100,
    color: "black",
    zIndex: 2,
    position: "absolute",
    top: "50%",
    right: "50%",
    transition: "all 100ms",
    transform: "translateX(50%) translateY(-50%)",
    "&:hover": {
      color: "red",
    },
  },
}))

export default function Youtube() {
  const [showVideo, setShowVideo] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const classes = useStyles({ iframeLoaded })
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
        <iframe
          className={classes.iframe}
          title="Service Playlist Video"
          src={youtubeLink}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIframeLoaded(true)}
        ></iframe>
      </div>
    )
  }
  return (
    <button className={classes.button} onClick={() => setShowVideo(true)}>
      <Img fluid={data.image.childImageSharp.fluid} className={classes.img}>
        <Icon className={classes.iconWrapper}>
          <div className={classes.icon1}></div>
          <YouTubeIcon className={classes.icon2} />
        </Icon>
      </Img>
    </button>
  )
}
