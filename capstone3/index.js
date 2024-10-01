import express from 'express'
import { postCollection, userCollection } from "./data.js";

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

app.get('/post/:id', (req, res) => {
  const post = postCollection.get(Number(req.params.id))
  post.author = userCollection.get(post.userId)
  res.render('post.ejs', { post })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
