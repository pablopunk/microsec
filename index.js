const fetch = require('isomorphic-fetch')
const url = require('url')

module.exports = async (req, res) => {
  const href = url.parse(req.url).href
  const requestedUrl = `http:/${href}`
  const fetched = await fetch(requestedUrl)
  const body = await fetched.text()
  res.end(body)
}
