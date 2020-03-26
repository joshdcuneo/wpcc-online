import { Link } from "gatsby-theme-material-ui"
import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import LogoFull from "./logo-full"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Grid from "@material-ui/core/Grid"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import MenuIcon from "@material-ui/icons/Menu"
import GroupIcon from "@material-ui/icons/Group"
import PaymentIcon from "@material-ui/icons/Payment"
import ChatBubbleIcon from "@material-ui/icons/ChatBubble"
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople"
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary"
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda"
import Drawer from "@material-ui/core/Drawer"
import {
  navHeight,
  connectFormLink,
  connectCardLabel,
  toolsLink,
  talksLink,
  prayerFormLink,
} from "../config"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import Box from "@material-ui/core/Box"
import PanToolIcon from "@material-ui/icons/PanTool"
import { Icon } from "@material-ui/core"

function Alert(props) {
  return (
    <MuiAlert
      elevation={6}
      variant="filled"
      {...props}
      style={{ display: "flex", alignItems: "center" }}
    />
  )
}

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  menuItems: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    justifyContent: "flex-end",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
  },
  drawer: { width: 250 },
  appBar: { height: navHeight },
  alert: {
    fontSize: "1.1rem",
    display: "flex",
    flexDirection: "column",
    "& .MuiAlert-action": {
      padding: 0,
    },
  },
  alertAction: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-evenly",
  },
  alertButton: {
    margin: 5,
    flexGrow: 1,
  },
  alertBody: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: { flexDirection: "column" },
  },
}))
const links = [
  [connectFormLink, connectCardLabel, EmojiPeopleIcon, true],
  ["/groups", "Groups", GroupIcon],
  ["/giving", "Giving", PaymentIcon],
  [toolsLink, "Resources", LocalLibraryIcon, true],
  [talksLink, "Sermons", ViewAgendaIcon, true],
  [prayerFormLink, "Request Prayer", ChatBubbleIcon, true],
]

function useLocalStorage(key) {
  const [value, _setValue] = useState(
    typeof window !== "undefined" && localStorage.getItem(key)
  )
  useEffect(() => {
    if (!value && typeof window !== "undefined") {
      _setValue(localStorage.getItem(key))
    }
  }, [key, value])
  const setValue = newValue => {
    if (typeof window !== "undefined") {
      _setValue(newValue)
      localStorage.setItem(key, newValue)
    }
  }
  return [value, setValue]
}

const Header = ({ pathname }) => {
  const classes = useStyles()
  const [menuOpen, setMenuOpen] = useState(false)
  const [lastConnected, setLastConnected] = useLocalStorage("lastConnected")
  const [promptToConnect, setPromptToConnect] = useState(
    !lastConnected || lastConnected < Date.now() - 24 * 60 * 60 * 1000 * 14
  )
  const handleLinkClick = label => () => {
    if (label === connectCardLabel) {
      setLastConnected(Date.now())
    }
  }
  const handlePromptAction = duration => () => {
    console.log(duration)
    if (duration === 0) {
      setPromptToConnect(false)
      setLastConnected(Date.now())
    }
    if (duration > 0) {
      setPromptToConnect(false)
      setTimeout(() => {
        setPromptToConnect(true)
      }, duration * 1000 * 60)
    }
  }
  const toggle = event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }
    setMenuOpen(prev => !prev)
  }
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Link to="/">
          <LogoFull style={{ width: 200, marginRight: "auto" }} />
        </Link>
        <Grid direction="row" className={classes.menuItems} container>
          <Links pathname={pathname} handleLinkClick={handleLinkClick} />
        </Grid>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={toggle}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer open={menuOpen} anchor="left" onClose={() => setMenuOpen(false)}>
        <DrawerLinks classes={classes} handleLinkClick={handleLinkClick} />
      </Drawer>
      <Snackbar
        open={promptToConnect}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <Alert
          severity="info"
          className={classes.alert}
          icon={false}
          action={
            <Box classes={alert} className={classes.alertAction}>
              <Button
                onClick={handlePromptAction(0)}
                variant="contained"
                className={classes.alertButton}
              >
                <Link
                  href={connectFormLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect Now
                </Link>
              </Button>
              <Button
                onClick={handlePromptAction(15)}
                variant="contained"
                className={classes.alertButton}
              >
                Remind me in 15
              </Button>
              <Button
                onClick={handlePromptAction(45)}
                variant="contained"
                className={classes.alertButton}
              >
                Remind me in 45
              </Button>
              <Button
                onClick={handlePromptAction(0)}
                variant="contained"
                className={classes.alertButton}
              >
                No thanks
              </Button>
            </Box>
          }
        >
          <Box className={classes.alertBody}>
            <Icon
              style={{
                margin: 10,
                transform: "rotate(15deg)",
                marginRight: "1rem",
              }}
              size="large"
            >
              <PanToolIcon></PanToolIcon>
            </Icon>
            <span>
              Hey! You haven't connected in a while. <br />
              We'd love to hear from you, click 'Connect Now' to say hello.
            </span>
          </Box>
        </Alert>
      </Snackbar>
    </AppBar>
  )
}

const DrawerLinks = ({ toggle, classes, handleLinkClick }) => (
  <div
    onClick={toggle}
    onKeyDown={toggle}
    role="presentation"
    className={classes.drawer}
  >
    <List>
      {links.map(([to, label, Icon, isExternal]) => (
        <ListItem key={to}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText onClick={handleLinkClick(label)}>
            {isExternal ? (
              <Link href={to} target="_blank" rel="noopener noreferrer">
                {label}
              </Link>
            ) : (
              <Link to={to}>{label}</Link>
            )}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  </div>
)

const Links = ({ pathname, handleLinkClick }) => {
  return links.map(([to, label, _, isExternal]) => (
    <Button
      key={to}
      style={{
        padding: 12,
      }}
    >
      {isExternal ? (
        <Link
          to={to}
          target="_blank"
          style={{
            color: "#fff",
            fontSize: "1.1rem",
            fontWeight: pathname === to ? "bold" : "normal",
          }}
          underline="none"
          rel="noopener noreferrer"
          onClick={handleLinkClick(label)}
        >
          {label}
        </Link>
      ) : (
        <Link
          to={to}
          style={{
            color: "#fff",
            fontSize: "1.1rem",
            fontWeight: pathname === to ? "bold" : "normal",
          }}
          underline="none"
        >
          {label}
        </Link>
      )}
    </Button>
  ))
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
