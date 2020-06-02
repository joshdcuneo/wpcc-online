// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const qs = require("querystring")
const fetch = require("node-fetch")

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdmMzNmNGYzZTFkYjQ5YmFiY2FjMWM0NGZlMjA4NzY2MGJjYTc3Y2RkZmMyYjczYTBhNDk3MjI5ZWY1ZWJmZjI5MzliYmRiN2Y0NGYwMDJlIn0.eyJhdWQiOiIzIiwianRpIjoiN2YzM2Y0ZjNlMWRiNDliYWJjYWMxYzQ0ZmUyMDg3NjYwYmNhNzdjZGRmYzJiNzNhMGE0OTcyMjllZjVlYmZmMjkzOWJiZGI3ZjQ0ZjAwMmUiLCJpYXQiOjE1OTEwNTg4MTcsIm5iZiI6MTU5MTA1ODgxNywiZXhwIjoxNjIyNTk0ODE3LCJzdWIiOiI4NyIsInNjb3BlcyI6W119.ybItt5RUEcDcM_B3izxQIXXU95JQWA3I4wJTdwyD66xxsQY1ajic1W3b25nhiFi2_H1YH_WGq8sErK3fZ5RnqwUD5tol7qZLSSB1t47-M2rCLNqVLCMihOi0yXS6V5Sll7BFuOQsX52jEi78x1aDlrsv55X0T1-pS_7hr2xWOizaJ_8_BGaQpCHupi89vMKwzXmIZMnsrNvH_QajOr9LifPub_FjTSHUcBjMFTPuvjBQeGgukg1LaYVXdm_A2pABp15kKEPcwaX7ILO_m2GytKdqMH02DsScZDPKWjz8MEWHLd51smVwvBUVUUxnuZufBCIWsPvzxGLW_rbOESlv3YM6jWY_YgmabhkDs9FlOheBDmTJyjusA6d3Btxihr9kT85JpZvuI8LaPvOSBjZWpGAIN9bqjtaHO4e6NsntlPQF_uaVrUjGPtim_TmTayNEZ4-peSRuSetkiYAEmC9TPylGjesXJCqZRRdLJ1ajGzB7i1MtC_twNi2KovIIr6PVUZxuzQfJzr0ntpQ5nl9ZUCjwbrxAsFZa2omdbxtIQpLKRQtiURX5W6Qkp77sok-9pzuzDyKh6MS9OP_qz25Z3wswIvoalXJqDIfMw40M6ZzJAx0exm-ypje89fmwuBpqhpjCPRfqrq9j7aQ8oVxmv5c8EIwyzy0XTCh7uHTun24"

const headers = {
  Authorization: `Bearer ${token}`,
}

const form = "wpcc-connection-covid"

async function getAllSubmissions() {
  const url = "https://api.paperform.co/v1/submissions"

  const query = {
    form,
    limit: 100,
    sort: "ASC",
  }
  let submissions = []
  let hasMore = true

  while (hasMore) {
    const lastSubmission = submissions[submissions.length - 1]
    if (lastSubmission) {
      query.after_id = lastSubmission.id
    }
    const res = await fetch(url + "?" + qs.stringify(query), { headers })
    const data = await res.json()
    submissions = submissions.concat(data.results.submissions)
    hasMore = data.has_more
  }
  return submissions
}

async function getFormFields() {
  const url = "https://api.paperform.co/v1/forms/"
  const res = await fetch(url + form + "/fields", { headers })
  const data = await res.json()
  return data.results.fields
}

exports.handler = async () => {
  try {
    const submissions = await getAllSubmissions()
    const fields = await getFormFields()
    return {
      statusCode: 200,
      body: JSON.stringify({ submissions, fields }),
      headers: { "content-type": "application/json" },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
