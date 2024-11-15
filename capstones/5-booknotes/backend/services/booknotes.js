const db = require('../util/db')

async function findBooknotesByUser(id = 1, { sort = [] } = {}) {
  let orderBy = ''
  if (sort.length) orderBy = `ORDER BY ${sort[0]} ${sort[1]}`

  const query = `
    SELECT booknotes.id, books.title, books.isbn, authors.name AS author, booknotes.content, booknotes.rating, booknotes.date_read
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

async function findBooknoteById(id) {
  const query = `
    SELECT booknotes.id, books.title, books.isbn, authors.name AS author, booknotes.content, booknotes.rating, booknotes.date_read
    FROM booknotes
    INNER JOIN books ON books.id = booknotes.book_id
    INNER JOIN authorship ON authorship.book_id = booknotes.book_id
    INNER JOIN authors ON authors.olid = authorship.author_id
    WHERE booknotes.id = $1;
  `

  return db.one(query, [id])
}

async function addBooknote(userId = 1, data) {
  // Add author to the db if it doesn't exist
  const { olid: authorId } = await db.one(
    `WITH t AS (INSERT INTO authors (olid, name) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING olid) SELECT * FROM t UNION SELECT olid FROM authors WHERE olid = $1;`,
    [data.authorKey, data.author],
  )
  // Add book to the db if it doesn't exist
  const { id: bookId } = await db.one(
    `WITH t AS (INSERT INTO books (title, isbn) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING id) SELECT * FROM t UNION SELECT id FROM books WHERE isbn = $2;`,
    [data.title, data.isbn],
  )
  // Add book-author relationship if it doesn't exist
  await db.none(`INSERT INTO authorship (book_id, author_id) VALUES ($1, $2) ON CONFLICT DO NOTHING;`, [bookId, authorId])
  // Add a new entry into the booknotes table
  await db.none(
    `INSERT INTO booknotes (user_id, book_id, content, rating, date_read) VALUES ($1, $2, $3, $4, TIMESTAMP $5 AT TIME ZONE 'Asia/Manila');`,
    [userId, bookId, data.notes, data.rating, data.dateRead],
  )
}

async function editBooknote(data) {
  await db.none(
    `UPDATE booknotes SET content = $2, rating = $3, date_read = TIMESTAMP $4 AT TIME ZONE 'Asia/Manila' WHERE id = $1;`,
    [data.id, data.notes, data.rating, data.dateRead]
  )
}

module.exports = {
  findBooknotesByUser,
  findBooknoteById,
  addBooknote,
  editBooknote,
}
