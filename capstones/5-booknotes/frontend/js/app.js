import AddBookForm from './add-book-form'
import BookCovers from './book-covers'
import BooknoteActions from './booknote-actions'

const bookCovers = new BookCovers()
const addBookForm = new AddBookForm('#addBookForm')
const booknoteActions = new BooknoteActions()

const sortForm = document.getElementById('sort-form')

sortForm.addEventListener('change', (e) => {
  e.currentTarget.submit()
})
