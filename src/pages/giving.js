import React from "react"
import Layout from "../components/layout"
import JustJesus from "../components/content-container"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/CardContent"
import Table from "@material-ui/core/Table"
import TableRow from "@material-ui/core/TableRow"
import TableContainer from "@material-ui/core/TableContainer"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import GiveButton from "../components/give-button"

const useStyles = makeStyles(theme => ({
  quote: {
    padding: "1rem 2rem",
    borderLeft: "5px solid grey",
    margin: "2rem 0",
  },
  card: {
    boxShadow: theme.shadows[2],
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
  },
  cards: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
      "& > div": {
        marginBottom: "1rem",
      },
    },
  },
  actions: {
    marginTop: "auto",
    display: "flex",
    width: "100%",
    "& > button": {
      flexGrow: 1,
    },
  },

  bold: {
    fontWeight: "bold",
  },
  table: {
    marginTop: "auto",
  },
}))

export default function Groups() {
  const classes = useStyles()
  return (
    <Layout>
      <JustJesus>
        <Container
          maxWidth="md"
          style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
        >
          <Typography variant="h1">Giving</Typography>
          <Typography variant="body1">
            Woonona Presbyterian Community Church relies on the regular
            financial giving of members to continue our ministry and mission in
            Woonona.
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.quote}>
            Each of you should give what you have decided in your heart to give,
            not reluctantly or under compulsion, for God loves a cheerful giver.
            8 And God is able to bless you abundantly, so that in all things at
            all times, having all that you need, you will abound in every good
            work. As it is written: “They have freely scattered their gifts to
            the poor; their righteousness endures forever.” —
            <em>2 Corinthians 9:7-9</em>
          </Typography>
        </Container>

        <Container maxWidth="md">
          <Typography
            variant="h2"
            gutterBottom
            style={{ marginBottom: "3rem" }}
          >
            Ways to give
          </Typography>
          <Box className={classes.cards}>
            <Card className={classes.card}>
              <CardContent>
                <Typography
                  variant="h4"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  gutterBottom
                >
                  <span>Direct Deposit</span>
                </Typography>
                <Typography variant="body1">
                  You can setup a direct transfer from your bank account to the
                  Woonona Presbyterian Church bank account.
                </Typography>
              </CardContent>
              <CardActions className={classes.actions}>
                <TableContainer component={Paper} className={classes.table}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.bold}>
                          Account Name
                        </TableCell>
                        <TableCell>Woonona Presbyterian Church</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.bold}>
                          Account Number
                        </TableCell>
                        <TableCell>202206509</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.bold}>BSB</TableCell>
                        <TableCell>012-593</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardActions>
            </Card>

            <Card className={classes.card}>
              <CardContent>
                <Typography
                  variant="h4"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  gutterBottom
                >
                  <span>Online</span>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Give online using quick and easy credit or debit card
                  payments.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  You can setup recurring offerings for the regular offering,
                  missions and the building fund or give a once off offering.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Securely stores your payment details and enables email
                  receipts.
                </Typography>
              </CardContent>
              <CardActions className={classes.actions}>
                <GiveButton />
              </CardActions>
            </Card>
          </Box>
        </Container>
      </JustJesus>
    </Layout>
  )
}
