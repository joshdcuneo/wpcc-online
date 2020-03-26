import { createMuiTheme, colors } from "@material-ui/core"

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: `#225b8b`,
    },
    secondary: {
      main: `#2390cf`,
    },
    error: {
      main: colors.red.A400,
    },
    background: {
      default: `#fff`,
    },
  },
  typography: {
    fontFamily: ["Calibri", "sans-serif"].join(","),
  },
})
export default theme
