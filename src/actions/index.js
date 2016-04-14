import axios from 'axios'

const ADD_BOOKS = 'ADD_BOOKS'
const CHECK_BOOKS = 'CHECK_BOOKS'

function addBooks (books) {
  return {
    type: ADD_BOOKS,
    payload: books.split('\n').filter(book => book.length)
  }
}

async function check (book) {
  const wrapAPIKey = 'bT0lMSGY6mgAg4EAetiv2Lt5LL3KmB7r'
  return await axios.get('https://wrapapi.com/use/jackytck/hkpl/query/0.0.3', {
    params: {
      name: book.title,
      wrapAPIKey
    }
  })
}

function checkBooks () {
  return async (dispatch, getState) => {
    const { bookList } = getState()
    const works = bookList.filter(book => book.state === 'pending').slice(0, 3)
    console.log(works)

    const results = await Promise.all(works.map(w => check(w)))
    console.log(results)
    // dispatch(results.map(...))
    // dispatch(checkBooks())
  }
}

export {
  ADD_BOOKS,
  CHECK_BOOKS,
  addBooks,
  checkBooks
}
