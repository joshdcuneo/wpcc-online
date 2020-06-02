import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import JustJesus from "../components/content-container"
import { Button } from "gatsby-theme-material-ui"
import { ResponsivePie } from "@nivo/pie"
import Box from "@material-ui/core/Box"
import { useMediaQuery, makeStyles } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import AlertTitle from "@material-ui/lab/AlertTitle"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"

const useStyles = makeStyles(theme => ({
  button: {
    fontSize: "1.1rem",
    color: "#fff",
    marginTop: "2rem",
    marginBottom: "4rem",
  },
  questionTitle: {
    [theme.breakpoints.down("md")]: {
      fontSize: "1.6rem",
    },
  },
  container: {
    textAlign: "left",
    maxWidth: 800,
    margin: "0 auto",
  },
  filterWrapper: {
    position: "fixed",
    bottom: 20,
    right: 20,
    display: "flex",
    zIndex: 100,
    maxWidth: "calc(100vw - 40px)",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  alertMessage: {
    display: "flex",
    flexWrap: "wrap",
  },
  bold: {
    fontWeight: "bold",
  },
  alert: {
    width: "100%",
    height: "100%",
    marginRight: 5,
    display: "flex",
    textAlign: "left",
  },
  loading: {
    marginTop: "6rem",
  },
  italic: {
    fontStyle: "italic",
  },
}))

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
  return (
    <Layout>
      <JustJesus>
        <Container className={classes.container}>
          <Typography variant="h2" gutterBottom>
            Connection Survey
          </Typography>
          {Boolean(filter) && (
            <Box className={classes.filterWrapper}>
              <Alert severity="info" className={classes.alert}>
                <AlertTitle>Filter</AlertTitle>
                <div className={classes.alertMessage}>
                  <span>
                    <span className={classes.bold}>Q: </span>
                    {filter.question}
                  </span>
                  <span>
                    <span className={classes.bold}>A: </span>
                    {filter.answer}
                  </span>
                </div>
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
          <Typography variant="body1" gutterBottom>
            Check back in here later if you like. As more results come in we
            will summarise them in more detail.
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.italic}>
            You can click on any category in a graph to filter the response data
            by that category.
          </Typography>
          {loading && <CircularProgress className={classes.loading} />}
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
                <Box key={questionTitle} mt={8} mb={2}>
                  <Typography
                    variant="h5"
                    className={classes.questionTitle}
                    gutterBottom
                  >
                    {questionTitle}
                  </Typography>
                  <Typography variant="body1" className={classes.description}>
                    {getDescription(questionTitle)}
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

function getMargin({ isSmallScreen, data }) {
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

function getDescription(question) {
  switch (question) {
    case "Are you keen to get back to church as soon as possible?":
      return "We asked this question to get a feel for the overall mood of the church with regard to gathering. In combination with the questions about age range and how you connect this will help to identify any particular issues for different demographics."
    case "What have you missed most about not gathering at Church?":
      return "Knowing what we miss will help us to prioritise the things we want to reintroduce. Instead of focusing on what we are not permitted to do we can start to thing about what are the best things we can be doing together."
    case "What have you enjoyed about doing church at home?":
      return "The break from our regular meetings has its good and bad sides. While there are many things we miss there are also fantastic opportunities we have now as we meet online or in smaller groups. By identifying them we can be conscious of not letting them fall by the wayside as we begin returning to 'normal'."
    case "How have you stayed in touch with others in WPCC during lockdown?":
      return "As a diverse group we have widely varying needs and capabilities. Its always helpful to know what others are doing to connect as we try to find the ways that work best for our life stage and circumstance."
    case "How would you suggest we approach gathering as a church?":
      return "There are a range of ways that we can already meet and new possibilities as restrictions are lifted. We don't want to rush back to 'normal' just because we can. It's important to consider what is the best way for our church family. This question helps us to gain insight as to what that might look like."
    case "What is your age range?":
      return "Depending on our life stage we are impacted differently by COVID. This question in combination with others helps us to identify if there are particular concerns for any demographics."
    case "How do you normally connect with WPCC?":
      return "One of the great things about meeting online has been the way we can connect with people further away than ever before. As we think about meeting in person its helpful to link peoples' answers with the way they normally connect with WPCC."
    default:
      return null
  }
}
