const axios = require('axios')

async function findBooks(q) {
  const url = new URL('https://openlibrary.org/search.json')
  url.searchParams.set('q', q)
  url.searchParams.set('fields', 'key,title,author_key,author_name,editions,editions.isbn')

  const { data } = await axios.get(url)
  const books = data.docs.map(itemToBook)
  console.log(books)
}

function itemToBook(item) {
  return {
    key: item.key,
    title: item.title,
    author: {
      name: item.author_name[0],
      olid: item.author_key[0],
    },
    isbn: item.editions.docs[0].isbn,
  }
}

findBooks('One Small Step Can Change Your Life')
