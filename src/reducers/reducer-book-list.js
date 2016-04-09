import { ADD_BOOKS } from '../actions'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_BOOKS:
      return [ ...state, ...action.payload ]
  }
  return state
}
