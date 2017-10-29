# microsec [![Build Status](https://travis-ci.org/pablopunk/microsec.svg?branch=master)](https://travis-ci.org/pablopunk/microsec)

<p align="center">
  <i>Fetch with <b>https</b> all the time</i>
</p>
<p align="center">
  <img src="https://github.com/pablopunk/art/raw/master/microsec/header.png"/>
</p>

See [pablopunk/microfetch](https://github.com/pablopunk/microfetch) to use `fetch` directly

## The problem

Sometimes you want to fetch an insecure URL `http://insecure-url.com/?example=1` from a secure server `https://my-secure-server.com` but you get this error:

```
Mixed Content: The page at 'https://my-secure-server/' was loaded over HTTPS,
but requested an insecure resource 'http://insecure-url.com/'.
This request has been blocked; the content must be served over HTTPS.
```

## The solution

Fetch it with _microsec.pw_!:

```js
// Javascript example
const fetch = require('isomorphic-fetch')

const url = 'https://microsec.pw/insecure-url.com/?example=1'
fetch(url).then(/* MAGIC */)
```

### Custom headers

The headers you send inside the request to _microsec.pw_ will remain intact.

```js
fetch(url, {headers: {'Accept-Language': 'es-ES,es;q=0.8,en;q=0.6,gl;q=0.4'}})
```

## Author

| ![me](https://www.gravatar.com/avatar/fa50aeff0ddd6e63273a068b04353d9d?s=100)|
| -----------------------------------------------------------------------------|
| © 2017 [__Pablo Varela__](http://pablo.life)                                 |
