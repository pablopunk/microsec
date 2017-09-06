const {send} = require('micro')
const fetch = require('isomorphic-fetch')
const url = require('url')

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const href = url.parse(req.url).href
  if (href === '/') {
    send(res, 400, 'Empty request')
    return
  }
  const requestedUrl = `http:/${href}`
  delete req.headers.host
  fetch(requestedUrl, { headers: req.headers })
    .then(async fetched => {
      const body = await fetched.text()
      res.end(body)
    })
    .catch(() => {
      send(res, 404, 'Not found')
    })
}
