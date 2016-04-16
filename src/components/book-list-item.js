import React from 'react'

function getLink (state, { link = '' } = {}) {
  if (state === 'found') {
    const chamo = link.match(/^<a href="..\/lib\/item\?id=chamo:([\d]+)/)[1]
    return (
      <a href={`https://webcat.hkpl.gov.hk/lib/item?id=chamo:${chamo}`} target='_blank'>{state}</a>
    )
  }
  return state
}

function BookListItem ({ index, book }) {
  const { state, title, data } = book
  let resultClass = state.replace(' ', '')
  return (
    <div className={`BookItem ${resultClass}`}>
      <span className='BookItemIndex'>{`${index + 1}.`}</span>
      <span className='BookItemTitle'>{title}</span>
      <span className={`BookItemState ${resultClass}`}>{getLink(state, data)}</span>
    </div>
  )
}

export default BookListItem
