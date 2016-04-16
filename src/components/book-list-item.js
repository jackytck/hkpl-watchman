import React from 'react'

function BookListItem ({ index, book }) {
  const { state, title } = book
  let resultClass = state.replace(' ', '')
  return (
    <div className={`BookItem ${resultClass}`}>
      <span className='BookItemIndex'>{`${index + 1}.`}</span>
      <span className='BookItemTitle'>{title}</span>
      <span className={`BookItemState ${resultClass}`}>{state}</span>
    </div>
  )
}

export default BookListItem
