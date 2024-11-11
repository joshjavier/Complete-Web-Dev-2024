const db = require('../util/db')

async function findBooknotesByUser(id = 1) {
  const booknotes = await db.any(`
      SELECT booknotes.user_id, booknotes.book_id, books.title, authors.name AS author, booknotes.content, booknotes.rating, booknotes.date_read
      FROM booknotes
      INNER JOIN books ON books.id = booknotes.book_id
      INNER JOIN authorship ON authorship.book_id = booknotes.book_id
      INNER JOIN authors ON authors.olid = authorship.author_id
      WHERE booknotes.user_id = $1;
    `, [id])

  return booknotes
}

module.exports = {
  findBooknotesByUser,
}
