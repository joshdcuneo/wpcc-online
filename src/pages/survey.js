import React, { useState, useEffect, useRef } from "react"
import Layout from "../components/layout"
import CircularProgress from "@material-ui/core/CircularProgress"
import Fab from "@material-ui/core/Fab"
import Box from "@material-ui/core/Box"
import VisibilityIcon from "@material-ui/icons/Visibility"
import { Link } from "gatsby-theme-material-ui"

const embedCode = `
  (function() {var script = document.createElement('script'); 
  script.src = "https://paperform.co/__embed"; 
  document.body.appendChild(script); })()
`

export default function Results() {
  const [isLoading, setIsLoading] = useState(true)
  const embedWrapperRef = useRef()
  const iframeRef = useRef()

  useEffect(() => {
    let interval
    function pollForIframe() {
      interval = setInterval(() => {
        const iframe =
          embedWrapperRef.current &&
          embedWrapperRef.current.querySelector("iframe")
        if (iframe) {
          iframe.onload = () => setIsLoading(false)
          iframeRef.current = iframe
        }
      }, 50)
    }
    const hasScript = document.querySelector(
      'script[src="https://paperform.co/__embed"]'
    )
    if (!hasScript) {
      const script = document.createElement("script")
      script.innerHTML = embedCode
      script.onload = () => pollForIframe
      document.body.appendChild(script)
    }
    if (isLoading) {
      pollForIframe()
    }
    return () => {
      clearInterval(interval)
    }
  }, [isLoading])

  return (
    <Layout>
      <Box display="flex" flexDirection="column" width="100%">
        {isLoading && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="80vh"
          >
            <CircularProgress style={{ margin: "auto" }} />
          </Box>
        )}

        <div
          style={{
            opacity: isLoading ? 0 : 1,
            transition: "all 1.5s",
            width: "100%",
          }}
          data-paperform-id="wpcc-connection-covid"
          ref={embedWrapperRef}
        ></div>
        {true && (
          <Fab
            style={{
              position: "fixed",
              top: 80,
              left: 15,
              display: "flex",
              alignItems: "center",
              fontSize: 18,
            }}
            variant="extended"
            color="primary"
            size="large"
          >
            <VisibilityIcon style={{ marginRight: 15 }} />
            <Link
              to="/results"
              style={{ color: "white", textDecoration: "none" }}
            >
              See the results
            </Link>
          </Fab>
        )}
      </Box>
    </Layout>
  )
}
