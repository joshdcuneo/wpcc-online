import React, { useRef, useEffect, useState } from "react"
import { tithelyScript } from "../config"
import Button from "@material-ui/core/Button"
import { CircularProgress } from "@material-ui/core"

export default function GiveButton() {
  const scriptMountedRef = useRef(false)
  const scriptLoadedRef = useRef(false)

  const [scriptLoaded, setScriptLoaded] = useState(false)
  useEffect(() => {
    let intervalId
    if (!scriptMountedRef.current && window) {
      const script = document.createElement("script")
      script.src = tithelyScript
      intervalId = setInterval(() => {
        if (
          window &&
          typeof window.create_tithely_widget === "function" &&
          !scriptLoadedRef.current
        ) {
          window.create_tithely_widget()
          setScriptLoaded(true)
          scriptLoadedRef.current = true
          clearInterval(intervalId)
        }
      }, 500)
      document.body.appendChild(script)
      scriptMountedRef.current = true
    }
    return () => clearInterval(intervalId)
  }, [scriptMountedRef, setScriptLoaded, scriptLoaded, scriptLoadedRef])
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      className="tithely-give-btn"
      data-church-id="1390250"
      disabled={!scriptLoaded}
    >
      {scriptLoaded ? "Give Online" : <CircularProgress />}
    </Button>
  )
}
