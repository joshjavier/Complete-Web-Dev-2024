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

async function addBook(id = 1, data) {
  // Use ISBN to fetch metadata
  // Check if author exists, otherwise add it to the authors table
  // Check if book exists, otherwise add it and connect to author
  // Add a new entry into the booknotes table
}

module.exports = {
  findBooknotesByUser,
}
