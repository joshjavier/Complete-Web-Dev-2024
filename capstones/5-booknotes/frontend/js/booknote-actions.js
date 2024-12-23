import { deleteBooknote, getBooknoteById } from "./services/booknotes"

class BooknoteActions {
  constructor() {
    this.editButtons = document.querySelectorAll('.editBooknote')
    this.deleteButtons = document.querySelectorAll('.deleteBooknote')
    this.editBooknoteModal = document.querySelector('#edit_booknote_modal')
    /** @type {HTMLFormElement} */
    this.editBooknoteForm = document.querySelector('#editBooknoteForm')
    this.events()
  }

  events() {
    this.editButtons.forEach(button => {
      button.addEventListener('click', this.openEditModal)
    })

    this.deleteButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        if (confirm('Are you sure you want to delete this booknote?')) {
          const booknoteEl = e.target.closest('article[data-isbn]')
          const id = booknoteEl.id
          await deleteBooknote(id)
          booknoteEl.remove()
        }
      })
    });
  }

  /**
   *
   * @param {Event} e
   */
  openEditModal = async (e) => {
    this.editBooknoteModal.showModal()

    // Fetch booknote data
    const booknoteId = e.target.closest('article[data-isbn]').id
    const booknote = await getBooknoteById(booknoteId)

    // Pre-fill form with fetched data
    const { editBooknoteId, editTitle, editAuthor, editIsbn, editNotes, rating, editDateRead } = this.editBooknoteForm.elements
    editBooknoteId.value = booknote.id
    editTitle.value = booknote.title
    editAuthor.value = booknote.author
    editIsbn.value = booknote.isbn
    editNotes.value = booknote.content
    rating.value = booknote.rating[0]
    editDateRead.value = new Intl.DateTimeFormat('sv-SE').format(new Date(booknote.date_read))
  }
}

export default BooknoteActions
