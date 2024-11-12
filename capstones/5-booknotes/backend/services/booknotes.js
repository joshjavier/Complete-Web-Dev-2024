const db = require('../util/db')

async function findBooknotesByUser(id = 1, { sort = [] } = {}) {
  let orderBy = ''
  if (sort.length) orderBy = `ORDER BY ${sort[0]} ${sort[1]}`

  const query = `
    SELECT booknotes.user_id, booknotes.book_id, books.title, books.isbn, authors.name AS author, booknotes.content, booknotes.rating, booknotes.date_read
    FROM booknotes
    INNER JOIN books ON books.id = booknotes.book_id
    INNER JOIN authorship ON authorship.book_id = booknotes.book_id
    INNER JOIN authors ON authors.olid = authorship.author_id
    WHERE booknotes.user_id = $1
    ${orderBy};
  `

  const booknotes = await db.any(query, [id])

  return booknotes
}

module.exports = {
  findBooknotesByUser,
}
