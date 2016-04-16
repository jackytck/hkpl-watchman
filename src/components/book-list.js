import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BookListItem from './book-list-item'

function BookList ({ bookList }) {
  return (
    <div className='BookList'>
      {bookList.map((book, index) => <BookListItem key={book.title} index={index} book={book} />)}
    </div>
  )
}

function mapStateToProps ({ bookList }) {
  return { bookList }
}

export default connect(mapStateToProps, null)(BookList)
