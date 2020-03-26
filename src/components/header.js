import { Link } from "gatsby-theme-material-ui"
import PropTypes from "prop-types"
import React, { useState } from "react"
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
import { navHeight } from "../config"

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
}))

const links = [
  ["https://wpcc.church/connection-card", "Connect", EmojiPeopleIcon],
  ["/groups", "Groups", GroupIcon],
  ["/giving", "Giving", PaymentIcon],
  ["https://wpcc.church/tools", "Resources", LocalLibraryIcon, true],
  ["https://wpcc.church/talks", "Sermons", ViewAgendaIcon, true],
  ["https://wpcc.church/prayer-request", "Request Prayer", ChatBubbleIcon],
]

const Header = ({ pathname }) => {
  const classes = useStyles()
  const [menuOpen, setMenuOpen] = useState(false)
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
          <Links pathname={pathname} />
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
        <DrawerLinks classes={classes} />
      </Drawer>
    </AppBar>
  )
}

const DrawerLinks = ({ toggle, classes }) => (
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
          <ListItemText>
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

const Links = ({ pathname }) => {
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
