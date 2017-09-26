import test from 'ava'
import micro from 'micro'
import listen from 'test-listen'
import {get} from 'got'
import m from '.'

const server = micro(m)

test('works', async t => {
  const url = await listen(server)
  const result = await get(`${url}/pablopunk.com`)

  t.is(result.statusCode, 200)
})
