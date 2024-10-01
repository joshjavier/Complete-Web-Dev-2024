import express from 'express'
import { postCollection, userCollection } from './data.js'
import { postRouter } from './controllers/post.js'

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  const posts = [...postCollection.values()].map(post => ({
    ...post,
    author: userCollection.get(post.userId),
  }))
  res.render('index.ejs', { posts })
})

app.use('/post', postRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
