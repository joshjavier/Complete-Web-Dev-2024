/**
 * @typedef CoverOptions
 * @type {object}
 * @property {'S' | 'M' | 'L'} size
 * @property {'isbn' | 'oclc' | 'lccn' | 'olid' | 'id'} key
 */

class BookCovers {
  constructor() {
    this.books = document.querySelectorAll('[data-isbn]')
    this.books.forEach(this.addCover)
  }

  /**
   * Generate an Open Library Covers API URL
   * @param {string} value The value of the chosen key
   * @param {CoverOptions} options Size and key of the image
   * @returns {string}
   */
  getCoverUrl(value, { size = 'M', key = 'isbn' } = {}) {
    return `https://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`
  }

  /**
   * Update the DOM with a book cover from the Open Library Covers API
   * @param {Element} bookEl
   */
  addCover = async (bookEl) => {
    const { isbn } = bookEl.dataset
    bookEl.querySelector('.cover > img').src = this.getCoverUrl(isbn)
  }

  // async fetchImage(url) {
  //   const img = new Image()
  //   return new Promise((res, rej) => {
  //     img.onload = () => res(img)
  //     img.onerror = e => rej(e)
  //     img.src = url
  //   })
  // }

  // replaceImgEl = async (el, isbn) => {
  //   // Get existing attributes
  //   /** @type {HTMLImageElement} */
  //   const { alt, className } = el.querySelector('.cover > img')

  //   /** @type {HTMLImageElement} */
  //   const img = await this.fetchImage(this.getCoverUrl(isbn))
  //   // Set attributes on the new image
  //   img.alt = alt
  //   img.className = className

  //   // Replace the placeholder img in the DOM
  //   el.querySelector('.cover').replaceChildren(img)
  // }
}

export default BookCovers
