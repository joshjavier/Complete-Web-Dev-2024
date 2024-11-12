import AddBookForm from './add-book-form'
import BookCovers from './book-covers'

const bookCovers = new BookCovers()
const addBookForm = new AddBookForm('#addBookForm')

const sortForm = document.getElementById('sort-form')

sortForm.addEventListener('change', (e) => {
  e.currentTarget.submit()
})
