import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addBooks, checkBooks } from '../actions'

function BookListInput ({ addBooks, checkBooks }) {
  let input

  function onClickAddBooks () {
    addBooks(input.value)
  }

  function onClickCheckBooks () {
    console.log('onClickCheckBooks()')
    checkBooks()
  }

  return (
    <div>
      <textarea
        className='form-control'
        placeholder='Copy and paste list of books (separated by EndOfLine) here.'
        rows={15}
        cols={100}
        ref={node => { input = node }} />
      <br />
      <button
        className='btn btn-info btn-labeled fa fa-magnet'
        onClick={onClickAddBooks}>
        Add Books
      </button>
      <button
        className='btn btn-info btn-labeled fa fa-magnet'
        onClick={onClickCheckBooks}>
        Check Books
      </button>
    </div>
  )
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    addBooks,
    checkBooks
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(BookListInput)
