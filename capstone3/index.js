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

app.get('/post/new', (req, res) => {
  res.render('new-post.ejs')
})

app.get('/post/:id', (req, res) => {
  let post, key = req.params.id

  if (isNaN(key)) {
    post = [...postCollection.values()].find(post => post.slug === key)
  } else {
    post = postCollection.get(Number(key))
  }

  if (!post) {
    res.sendStatus(404)
  }

  post.author = userCollection.get(post.userId)
  res.render('post.ejs', { post })
})

app.post('/post/new', (req, res) => {
  const post = {
    ...req.body,
    id: Math.max(...postCollection.keys()) + 1,
    userId: 999,
  }
  postCollection.set(post.id, post)
  res.redirect(`/post/${post.slug}`)
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
