import micro from 'micro'
import listen from 'test-listen'
import {get} from 'got'
import m from '.'

const test = require('ava').serial

const server = micro(m)

test('works with a url', async t => {
  const url = await listen(server)
  const result = await get(`${url}/pablopunk.com`)

  t.is(result.statusCode, 200)
  server.close()
})

test('returns a 400 with an empty url', async t => {
  t.plan(1)
  const url = await listen(server)
  await get(url)
    .then(t.fail)
    .catch(err => {
      t.is(err.statusCode, 400)
    })
  server.close()
})

test('returns a 404 if the url is not found', async t => {
  t.plan(1)
  const url = await listen(server)
  await get(`${url}/pablopunk.com/foo-bar`)
    .then(t.fail)
    .catch(err => {
      t.is(err.statusCode, 404)
    })
  server.close()
})
