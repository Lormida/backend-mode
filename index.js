const express = require('express')
const bodyParser  = require('body-parser')
const cors = require('cors')

require('dotenv').config()

const DATABASE_URL = process.env.DATABASE_URL || 'ERROR'
const POSTGRES_USER = process.env.POSTGRES_USER || 'ERROR'
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'ERROR'
const POSTGRES_DB = process.env.POSTGRES_DB || 'ERROR'

const { readRecords, insertRecord, deleteRecord } = require('./src/utils/records.js');


const PORT = 5000

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (_, res) => {
  res.send('Hello from the time saving service!', DATABASE_URL, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB)
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
