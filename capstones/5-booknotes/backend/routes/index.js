const { findBooknotesByUser, addBooknote, editBooknote } = require('../services/booknotes')
const router = require('express').Router()

/* GET home page. */
router.get('/', async (req, res, next) => {
  let sort = []
  switch (req.query.sort) {
    case 'rating':
      sort = ['booknotes.rating', 'DESC']
      break
    case 'recency':
      sort = ['booknotes.date_read', 'DESC']
      break
    case 'title':
      sort = ['books.title', 'ASC']
      break
  }
  const booknotes = await findBooknotesByUser(1, { sort })
  res.render('index', {
    title: "Booknotes by Josh",
    booknotes,
    sort: req.query.sort,
  })
})

router.post('/add', async (req, res) => {
  await addBooknote(1, req.body)
  res.redirect('/')
})

router.post('/edit', async (req, res) => {
  await editBooknote(req.body)
  res.redirect('/')
})

module.exports = router
