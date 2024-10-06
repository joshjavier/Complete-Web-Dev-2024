import { postCollection, userCollection } from "../data.js"

export function postExtractor(req, res, next) {
  if (req.params.id) {
    const key = req.params.id

    if (isNaN(key)) {
      req.post = [...postCollection.values()].find(post => post.slug === key)
    } else {
      req.post = postCollection.get(Number(key))
    }

    if (req.post) {
      req.post.author = userCollection.get(req.post.userId)
    }
  }

  next()
}
