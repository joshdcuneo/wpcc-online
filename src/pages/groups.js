import React from "react"
import Layout from "../components/layout"
import { Container, Typography, makeStyles } from "@material-ui/core"
import JustJesus from "../components/content-container"
import { Button, Link } from "gatsby-theme-material-ui"

const useStyles = makeStyles(theme => ({
  button: {
    fontSize: "1.1rem",
    color: "#fff",
    marginTop: "2rem",
    marginBottom: "4rem",
  },
  link: { color: "#fff" },
}))
export default function Groups() {
  const classes = useStyles()
  return (
    <Layout>
      <JustJesus>
        <Container maxWidth="md">
          <Typography variant="h1">Community @ WPCC</Typography>
          <Typography variant="body1" gutterBottom>
            For all of us at Woonona Pressy, community is a key part of
            following Jesus. We want to be hearing the truth from God's Word and
            each other, practicing the way of Jesus as we put the truth into
            action and doing all of this in community.
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{ marginBottom: "6rem" }}
          >
            Being connected to other followers of Jesus in deep, honest,
            vulnerable, truthful, intimate, other-focused, self-giving
            relationships is essential <strong>especially</strong> in this
            turbulent time.
          </Typography>
          <Typography variant="h2">House Church Network</Typography>
          <Typography variant="body1" gutterBottom>
            As we seek to care for each other and our community in response to
            the spread of COVID-19 church looks a little different. While we are
            not able to meet together physically it is important that we still
            find ways to connect with God, hear from His Word and be in
            community under Him.
          </Typography>
          <Typography variant="body1" gutterBottom>
            We continue to gather as the people of God online. Join us on Sunday
            as we sing praises and hear from God's Word in our homes via service
            playlists on our Youtube channel and this site and join each other
            afterwards online or on the phone to reflect and pray together for
            each other, our community and the world.
          </Typography>
          <Typography variant="body1" gutterBottom>
            If you would like to find out more or connect with a house church
            you can introduce yourself below and we will be in touch soon.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            <Link
              to="https://wpcc.church/forms/house-church"
              className={classes.link}
              target="_blank"
            >
              Connect with a House Church
            </Link>
          </Button>
          <Typography variant="h2">Grow Groups</Typography>
          <Typography variant="body1" gutterBottom>
            We also continue to meet mid week in variety of ways but the key one
            is in Grow Groups. We spend time reading and reflecting on the
            passage from Sunday individually or in our households and then meet
            online to reflect on the passage, encourage each other to continue
            practicing the way of Jesus and support each other through prayer
            and practical help.
          </Typography>
          <Typography variant="body1" gutterBottom>
            If you would like to find out more or connect with a grow group you
            can introduce yourself below and we will be in touch soon.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            <Link
              to="https://wpcc.church/forms/grow-group"
              className={classes.link}
              target="_blank"
            >
              Connect with a Grow Group
            </Link>
          </Button>
        </Container>
      </JustJesus>
    </Layout>
  )
}
