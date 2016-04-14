import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

function BookList ({ bookList }) {
  // if (!bookList.length) {
  //   return <div></div>
  // }
  return (
    <div>
      <ol>
        {bookList.map(book => <li key={book.title}>{book.title}</li>)}
      </ol>
    </div>
  )
}

function mapStateToProps ({ bookList }) {
  return { bookList }
}

export default connect(mapStateToProps, null)(BookList)
