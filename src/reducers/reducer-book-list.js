import { ADD_BOOKS } from '../actions'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_BOOKS:
      const books = action.payload.map(book => ({
        state: 'pending',
        title: book
      }))
      return [ ...state, ...books ]
  }
  return state
}
