import { Router } from 'express'
import { postCollection } from '../data.js'
import { postExtractor } from '../middleware/post-extractor.js'

export const postRouter = Router()

postRouter.get('/new', (req, res) => {
  res.render('new-post.ejs')
})

postRouter.get('/:id', postExtractor, (req, res) => {
  if (req.post) {
    res.render('post.ejs', { post: req.post })
  } else {
    res.sendStatus(404)
  }
})

postRouter.post('/new', (req, res) => {
  const post = {
    ...req.body,
    id: Math.max(...postCollection.keys()) + 1,
    userId: 999,
  }
  postCollection.set(post.id, post)
  res.redirect(`/post/${post.slug}`)
})

postRouter.get('/:id/edit', postExtractor, (req, res) => {
  if (req.post) {
    res.render('edit-post.ejs', { post: req.post })
  } else {
    res.sendStatus(404)
  }
})
