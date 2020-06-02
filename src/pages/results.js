import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { Container, Typography, makeStyles } from "@material-ui/core"
import JustJesus from "../components/content-container"
import { Button } from "gatsby-theme-material-ui"
import { VictoryPie, VictoryLegend, VictoryLabel } from "victory"
import Box from "@material-ui/core/Box"
import Color from "color"

const useStyles = makeStyles(() => ({
  button: {
    fontSize: "1.1rem",
    color: "#fff",
    marginTop: "2rem",
    marginBottom: "4rem",
  },
  link: { color: "#fff" },
}))

function normalize(data) {
  const normalizedData = {
    counts: data.fields.reduce((acc, field) => {
      if (field.type !== "choices") return acc
      acc[field.title] = field.options.reduce((ac, option) => {
        ac[option] = 0
        return ac
      }, {})
      return acc
    }, {}),
    textAnswers: data.fields.reduce((acc, field) => {
      acc[field.title] = []
      return acc
    }, {}),
  }
  data.fields.forEach(field => {
    if (field.type === "choices") {
      const answers = data.submissions.flatMap(
        submission => submission.data[field.key]
      )
      answers.forEach(answer => {
        if (field.options.includes(answer)) {
          normalizedData.counts[field.title][answer] =
            normalizedData.counts[field.title][answer] + 1
        } else {
          normalizedData.textAnswers[field.title].push(answer)
        }
      })
    }
    if (field.type === "text") {
      const answers = data.submissions.flatMap(
        submission => submission.data[field.key]
      )
      normalizedData.textAnswers[field.title] = answers
    }
  })
  return normalizedData
}

export default function Results() {
  const [results, setResults] = useState(null)
  const [filter, setFilter] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!results && !loading) {
      setLoading(true)
      fetch("/.netlify/functions/paperform-submissions")
        .then(res => res.json())
        .then(data => {
          setResults(normalize(data))
          setLoading(false)
        })
    }
  }, [loading, results])

  const classes = useStyles()
  const baseColor = Color("#225b8b")
  const colors = [
    baseColor.darken(0.75),
    baseColor.darken(0.5),
    baseColor.darken(0.25),
    baseColor,
    baseColor.lighten(0.25),
    baseColor.lighten(0.5),
    baseColor.lighten(0.75),
    baseColor.lighten(1),
  ]
  console.log({ results, loading, filter })
  return (
    <Layout>
      <JustJesus>
        <Container maxWidth="md">
          <Typography variant="h1">Connection Survey</Typography>
          <Typography variant="body1" gutterBottom>
            Check out the connection survey results summary below.
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{ marginBottom: "6rem" }}
          >
            You can click on any category in a graph to filter the response data
            by that category.
          </Typography>
          {!loading &&
            results &&
            results.counts &&
            Object.keys(results.counts).map(questionTitle => {
              const data = Object.keys(results.counts[questionTitle]).map(
                key => ({
                  x: key,
                  y: results.counts[questionTitle][key],
                })
              )
              const legendData = Object.keys(results.counts[questionTitle]).map(
                name => {
                  const parts = name.split("(")
                  if (parts.length === 1) {
                    return { name }
                  }
                  return { name: [parts[0].slice(0, -1), "(" + parts[1]] }
                }
              )
              console.log(data)
              return (
                <Box key={questionTitle}>
                  <Typography variant="h4" style={{ marginTop: "6rem" }}>
                    {questionTitle}
                  </Typography>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box>
                      <VictoryPie
                        data={data}
                        horizontal
                        colorScale={colors}
                        labels={() => null}
                      />
                    </Box>
                    <Box
                      style={{
                        margin: "auto",
                      }}
                    >
                      <VictoryLegend
                        data={legendData}
                        colorScale={colors}
                        style={{ labels: { fontSize: 18 } }}
                      />
                    </Box>
                  </Box>
                </Box>
              )
            })}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={console.log}
          >
            Clear Filters
          </Button>
        </Container>
      </JustJesus>
    </Layout>
  )
}
