import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { Container, Typography } from "@material-ui/core"
import JustJesus from "../components/content-container"
import { Button } from "gatsby-theme-material-ui"
import { ResponsivePie } from "@nivo/pie"
import Box from "@material-ui/core/Box"
import { useMediaQuery, makeStyles } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"

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
  if (!data) {
    return null
  }
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

function filterResults(data, filter) {
  if (!data) {
    return null
  }
  if (!filter) {
    return data
  }
  const { fields, submissions } = data
  const field = fields.find(({ title }) => title === filter.question)
  return {
    fields: data.fields,
    submissions: submissions.filter(submission => {
      const answer = submission.data[field.key]
      if (typeof answer === "string") {
        return filter.answer === answer
      }
      if (Array.isArray(answer)) {
        return answer.includes(filter.answer)
      }
      return false
    }),
  }
}

export default function Results() {
  const [results, setResults] = useState(null)
  const [filter, setFilter] = useState(null)
  const [loading, setLoading] = useState(false)
  const filteredResults = filterResults(results, filter)
  const normalizedResults = normalize(filteredResults)
  useEffect(() => {
    if (!results && !loading) {
      setLoading(true)
      fetch("/.netlify/functions/paperform-submissions")
        .then(res => res.json())
        .then(data => {
          setResults(data)
          setLoading(false)
        })
    }
  }, [loading, results])

  const isSmallScreen = useMediaQuery("(max-width: 600px)")
  const classes = useStyles()
  // const baseColor = Color("#225b8b")
  // const colors = [
  //   baseColor.darken(0.75),
  //   baseColor.darken(0.5),
  //   baseColor.darken(0.25),
  //   baseColor,
  //   baseColor.lighten(0.25),
  //   baseColor.lighten(0.5),
  //   baseColor.lighten(0.75),
  //   baseColor.lighten(1),
  // ]
  console.log({ results, loading, filter })
  return (
    <Layout>
      <JustJesus>
        <Container
          maxWidth="md"
          style={{ textAlign: "center", position: "relative" }}
        >
          <Typography variant="h2">Connection Survey</Typography>
          <Typography variant="body1">
            Check out the connection survey results summary below.
          </Typography>
          {Boolean(filter) && (
            <Box
              style={{
                position: "fixed",
                bottom: 20,
                right: 20,
                display: "flex",
                zIndex: 100,
              }}
            >
              <Alert
                severity="info"
                style={{
                  width: "max-content",
                  height: "100%",
                  marginRight: 5,
                  display: "flex",
                }}
              >
                <span>
                  {" "}
                  {filter.question}{" "}
                  <span style={{ fontWeight: "bold" }}>is</span> {filter.answer}
                </span>
              </Alert>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => setFilter(null)}
                style={{ margin: 0 }}
              >
                Clear Filter
              </Button>
            </Box>
          )}
          <Typography
            variant="body1"
            gutterBottom
            style={{ marginBottom: "6rem" }}
          >
            You can click on any category in a graph to filter the response data
            by that category.
          </Typography>
          {!loading &&
            normalizedResults &&
            normalizedResults.counts &&
            Object.keys(normalizedResults.counts).map(questionTitle => {
              let data = Object.keys(
                normalizedResults.counts[questionTitle]
              ).map(key => ({
                id: isSmallScreen ? shortenLabel(key) : key,
                value: normalizedResults.counts[questionTitle][key],
              }))
              const hasLongLabel = checkHasLongLabel(data)
              const anchor = getAnchor({ isSmallScreen, hasLongLabel })
              return (
                <Box key={questionTitle}>
                  <Typography
                    variant="h4"
                    style={{ marginTop: "6rem", marginBottom: "2rem" }}
                  >
                    {questionTitle}
                  </Typography>
                  <Box
                    style={{
                      height: anchor === "bottom" ? "54vh" : "40vh",
                      width: "100%",
                    }}
                  >
                    <ResponsivePie
                      onClick={({ id }) =>
                        setFilter({ question: questionTitle, answer: id })
                      }
                      data={data}
                      margin={getMargin({ questionTitle, isSmallScreen, data })}
                      innerRadius={0.5}
                      padAngle={0.7}
                      cornerRadius={3}
                      colors={{ scheme: "set3" }}
                      // borderWidth={1}
                      borderColor={{
                        from: "color",
                        modifiers: [["darker", 0.2]],
                      }}
                      enableRadialLabels={false}
                      slicesLabelsSkipAngle={10}
                      slicesLabelsTextColor="#333333"
                      animate={true}
                      motionStiffness={90}
                      motionDamping={15}
                      theme={{
                        labels: {
                          text: {
                            fontSize: isSmallScreen ? 18 : 24,
                            fontWeight: "bold",
                          },
                        },
                        legends: { text: { fontSize: 18 } },
                      }}
                      legends={[
                        getLegend({ questionTitle, isSmallScreen, data }),
                      ]}
                    />
                  </Box>
                </Box>
              )
            })}
        </Container>
      </JustJesus>
    </Layout>
  )
}

const itemHeight = 20
const itemWidthRight = 250

function checkHasLongLabel(data) {
  const longestLabel = data.reduce(
    (len, { id }) => (id.length > len ? id.length : len),
    0
  )
  const hasLongLabel = longestLabel > 40
  return hasLongLabel
}

function getAnchor({ isSmallScreen, hasLongLabel }) {
  return isSmallScreen || hasLongLabel ? "bottom" : "right"
}

function getLegend({ isSmallScreen, data }) {
  const hasLongLabel = checkHasLongLabel(data)
  const anchor = getAnchor({ isSmallScreen, hasLongLabel })
  const itemWidthBottom = isSmallScreen ? 300 : 650
  const itemWidth = anchor === "bottom" ? itemWidthBottom : itemWidthRight
  return {
    anchor,
    direction: "column",
    itemWidth,
    itemHeight,
    itemTextColor: "black",
    symbolSize: 18,
    symbolShape: "circle",
    translateY: anchor === "bottom" ? itemHeight * (data.length + 1) : 0,
    translateX: anchor === "right" ? itemWidthRight + 20 : 0,
  }
}

function getMargin({ questionTitle, isSmallScreen, data }) {
  const hasLongLabel = checkHasLongLabel(data)
  const anchor = getAnchor({ isSmallScreen, hasLongLabel })
  const x = isSmallScreen ? 10 : 80
  const bottom =
    isSmallScreen || hasLongLabel ? (data.length + 2) * itemHeight : 20
  return {
    top: 30,
    left: x,
    right: anchor === "right" ? itemWidthRight + 20 : x,
    bottom,
  }
}

function shortenLabel(label) {
  switch (label) {
    case "Roster 2-3 House Churches to meet in “Church” each week (without singing)":
      return "2-3 House Churches at church (no sing)"
    case "Roster 2-3 House Churches to meet in “Church” each week (once singing is allowed)":
      return "2-3 House Churches at church (sing)"
    case "4-5 services in Church on a Sunday (without singing)":
      return "4-5 House Churches at church (no sing)"
    case "4-5 services in Church on a Sunday (once singing is allowed)":
      return "4-5 House Churches at church (sing)"
    case "Wait till all restrictions are lifted (including singing)":
      return "Wait till no restrictions"
    default:
      return label
  }
}
