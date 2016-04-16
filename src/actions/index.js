import axios from 'axios'

const ADD_BOOKS = 'ADD_BOOKS'
const CHECK_BOOKS = 'CHECK_BOOKS'
const UPDATE_BOOKS = 'UPDATE_BOOKS'
const QUERY_RESULT = 'QUERY_RESULT'

const WRAP_API_URL = 'https://wrapapi.com/use/jackytck/hkpl/query/0.0.3'
// const WRAP_API_KEY = 'xUsJnMtBqIVhVA72EPEWY2Yo1Wc8CZH0'
const WRAP_API_KEY = 'bT0lMSGY6mgAg4EAetiv2Lt5LL3KmB7r'

function addBooks (books) {
  return {
    type: ADD_BOOKS,
    payload: books.split('\n').filter(book => book.length)
  }
}

function updateBooks (books) {
  return {
    type: UPDATE_BOOKS,
    payload: books
  }
}

function check (book) {
  return axios.get(WRAP_API_URL, {
    params: {
      name: book.title,
      wrapAPIKey: WRAP_API_KEY
    }
  })
}

function queryResult (book) {
  const { title, outputScenario } = book
  switch (outputScenario) {
    case 'found':
      return {
        type: QUERY_RESULT,
        payload: {
          title,
          state: 'found',
          data: book.data
        }
      }
    case 'notFound':
      return {
        type: QUERY_RESULT,
        payload: {
          title,
          state: 'not found',
          data: book.data
        }
      }
  }
}

function checkBooks () {
  return async (dispatch, getState) => {
    const { bookList } = getState()
    const querying = bookList
      .filter(book => book.state === 'pending')
      .slice(0, 3)
      .map(book => Object.assign(book, { state: 'querying' }))
    dispatch(updateBooks(querying))

    const results = await Promise.all(querying.map(w => check(w)))
    results.forEach((query, idx) => dispatch(queryResult(Object.assign({}, querying[idx], query.data))))

    if (querying.length) {
      dispatch(checkBooks())
    }
  }
}

export {
  ADD_BOOKS,
  CHECK_BOOKS,
  UPDATE_BOOKS,
  QUERY_RESULT,
  addBooks,
  checkBooks,
  updateBooks,
  queryResult
}
