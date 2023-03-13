const express = require('express')
const bodyParser  = require('body-parser')
const cors = require('cors')

const { readRecords, insertRecord, deleteRecord } = require('./src/utils/records.js');


const PORT = 5000

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (_, res) => {
  res.send('Hello from the time saving service!')
})

app.get('/times', async (_, res) => {
  res.json(await readRecords())
})

app.post('/times', async (req, res) => {
  res.send(await insertRecord(req.body.time))
})

app.delete('/time/:id', async (req, res) => {
  res.send(await deleteRecord(req.params.id))
})

app.listen(PORT, () => {
  console.log(`Express web server is running at http://localhost:${PORT}`)
  console.log('HELLO WORLD')
})
