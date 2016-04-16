import { ADD_BOOKS, UPDATE_BOOKS, QUERY_RESULT } from '../actions'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_BOOKS:
      const books = action.payload.map(book => ({
        state: 'pending',
        title: book
      }))
      return [ ...state, ...books ]
    case UPDATE_BOOKS:
      return state.map(book => {
        if (book.title !== action.payload.title) {
          return book
        }
        return Object.assign({}, book, action.payload)
      })
    case QUERY_RESULT:
      return state.map(book => {
        if (book.title !== action.payload.title) {
          return book
        }
        return Object.assign({}, book, action.payload)
      })
  }
  return state
}
