import { combineReducers } from 'redux'
import BookListReducer from './reducer-book-list'

const rootReducer = combineReducers({
  bookList: BookListReducer
})

export default rootReducer
