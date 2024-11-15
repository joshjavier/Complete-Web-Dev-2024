const { findBooknoteById, deleteBooknote } = require('../services/booknotes')

const router = require('express').Router()

router.get('/:id', async (req, res) => {
  const booknote = await findBooknoteById(req.params.id)
  res.json(booknote)
})

router.delete('/:id', async (req, res) => {
  await deleteBooknote(req.params.id)
  res.sendStatus(204)
})

module.exports = router
