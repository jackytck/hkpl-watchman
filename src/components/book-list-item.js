import React from 'react'
import { parseLink } from '../library/hkpl'

function BookListItem ({ index, book }) {
  const { state, title, data } = book
  let resultClass = state.replace(' ', '')
  return (
    <div className={`BookItem ${resultClass}`}>
      <span className='BookItemIndex'>{`${index + 1}.`}</span>
      <span className='BookItemTitle'>{title}</span>
      <span className={`BookItemState ${resultClass}`}>{parseLink(state, data)}</span>
    </div>
  )
}

export default BookListItem
