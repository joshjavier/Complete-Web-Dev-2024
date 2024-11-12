import BookCovers from './book-covers'

const bookCovers = new BookCovers()

const sortForm = document.getElementById('sort-form')

sortForm.addEventListener('change', (e) => {
  e.currentTarget.submit()
})
