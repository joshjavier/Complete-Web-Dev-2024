import axios from 'axios'

class AddBookForm {
  constructor(selectors) {
    /** @type {HTMLFormElement} */
    this.form = document.querySelector(selectors)
    this.events()
  }

  events = () => {
    this.form.addEventListener('change', async (e) => {
      const { isbn, title, author } = this.form.elements

      // Trigger queries only if title, author, or isbn fields are updated
      if (![isbn, title, author].includes(e.target)) {
        return
      }

      // Do nothing if all fields are blank
      if ([isbn, title, author].map(el => el.value).every(v => !v)) {
        return
      }

      let q
      if (e.target === isbn) {
        q = e.target.value
        const [book] = await this.findBooks(q)
        title.value = book.title
        author.value = book.author.name
      } else {
        q = `${title.value} ${author.value}`.trim()
        const [book] = await this.findBooks(q)
        console.log(book.title)
        console.log(book.author)
        console.log(book.isbn)
        if (!title.value && book.title) title.value = book.title
        if (!author.value && book.author) author.value = book.author.name
        if (!isbn.value && book.isbn) isbn.value = book.isbn.pop()
      }
    })
  }

  async findBooks (q, limit = 5) {
    const url = new URL('https://openlibrary.org/search.json')
    url.searchParams.set('q', q)
    url.searchParams.set('fields', 'key,title,author_key,author_name,editions,editions.isbn')
    url.searchParams.set('limit', limit)

    console.log(url)
    const { data } = await axios.get(url)
    const books = data.docs.map(this.itemToBook)
    return books.filter(b => b.isbn)
  }

  itemToBook(item) {
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
}

export default AddBookForm
