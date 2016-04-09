const ADD_BOOKS = 'ADD_BOOKS'

function addBooks (books) {
  return {
    type: ADD_BOOKS,
    payload: books.split('\n').filter(book => book.length)
  }
}

export { ADD_BOOKS, addBooks }
