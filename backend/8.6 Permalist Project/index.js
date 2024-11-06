import express from 'express'
import bodyParser from 'body-parser'
import { connectToDatabase } from './util/db.js'
import { Todo } from './models/index.js'

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', async (req, res) => {
  const items = await Todo.findAll()
  res.render('index.ejs', {
    listTitle: 'Today',
    listItems: items,
  })
})

app.post('/add', async (req, res) => {
  const { newItem } = req.body
  await Todo.create({ title: newItem })
  res.redirect('/')
})

app.post('/edit', (req, res) => {})

app.post('/delete', (req, res) => {})

async function start() {
  await connectToDatabase()
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  })
}

start()
