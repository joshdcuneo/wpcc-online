import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.css"
import { makeStyles } from "@material-ui/core/styles"
import Youtube from "../components/youtube"
import Bible from "../components/bible"

const useStyles = makeStyles(theme => ({
  main: { flexGrow: 1, display: "flex", width: "100%" },
  sidebar: {
    width: 500,
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flex: "1 1 30%",
    },
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      flex: "1 1 1",
    },
  },
}))

const IndexPage = ({ location }) => {
  const classes = useStyles()
  return (
    <Layout pathname={location.pathname}>
      <SEO title="Home" />
      <div className={classes.wrapper}>
        <div className={classes.main}>
          <Youtube />
        </div>
        <div className={classes.sidebar}>
          <Bible />
        </div>
      </div>
    </Layout>
  )
}
export default IndexPage
