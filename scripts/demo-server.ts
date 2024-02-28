import { join } from 'node:path'
import express from 'express'
import { renderFile } from 'ejs'

const root = new URL('..', import.meta.url).pathname

const app = express()

app.use('/static/assets', express.static(join(root, 'build/client/assets'), {
  setHeaders: (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
  }
}))

app.use('/demo', async (_, res) => {
  res.send(
    await renderFile(join(root, 'build/client/index.html'), {
      remix_public_path: 'http://0.0.0.0:3000/static'
    })
  )
});

app.listen(3000, () => {
  console.log('Server is running on port=3000')
})

