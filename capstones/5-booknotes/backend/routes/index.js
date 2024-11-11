const { findBooknotesByUser } = require('../services/booknotes')
const router = require('express').Router()

/* GET home page. */
router.get('/', async (req, res, next) => {
  const booknotes = await findBooknotesByUser(1)
  console.log(booknotes)
  res.render('index', { title: "Booknotes by Josh", booknotes })
})

module.exports = router
