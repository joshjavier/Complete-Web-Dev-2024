const { findBooknoteById } = require('../services/booknotes')

const router = require('express').Router()

router.get('/:id', async (req, res) => {
  const booknote = await findBooknoteById(req.params.id)
  res.json(booknote)
})

module.exports = router
