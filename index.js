const url = require('url')
const {send} = require('micro')
const fetch = require('isomorphic-fetch')

const setResponseHeaders = (headers, res) => {
  for (const h in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, h)) {
      res.setHeader(h, headers[h])
    }
  }
  return res
}

const defaultResponseHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Accept-Laguage, User-Agent'
}

const removeHeaderFromRequest = (req, header) => {
  delete req.headers[header]
  return req
}

module.exports = async (req, res) => {
  res = setResponseHeaders(defaultResponseHeaders, res)
  const href = url.parse(req.url).href
  if (href === '/') {
    send(res, 400, 'Empty request')
    return
  }
  const requestedUrl = `http:/${href}`

  removeHeaderFromRequest(req, 'host')

  fetch(requestedUrl, {headers: req.headers})
    .then(async fetched => {
      if (fetched.status === 404) {
        send(res, 404, 'Not found')
        return
      }
      const body = await fetched.text()
      res.end(body)
    })
    .catch(() => {
      send(res, 404, 'Not found')
    })
}
