import React from 'react'
import axios from 'axios'

const WRAP_API_URL = 'https://wrapapi.com/use/jackytck/hkpl/query/0.0.3'
const CHAMO_BASE_URL = 'https://webcat.hkpl.gov.hk/lib/item?id=chamo:'
const WRAP_API_KEY = process.env.WRAP_API_KEY || 'xUsJnMtBqIVhVA72EPEWY2Yo1Wc8CZH0'

function checkBook (book) {
  return axios.get(WRAP_API_URL, {
    params: {
      name: book.title,
      wrapAPIKey: WRAP_API_KEY
    }
  })
}

function parseLink (state, { link = '' } = {}) {
  if (state === 'found') {
    const chamo = link.match(/^<a href="..\/lib\/item\?id=chamo:([\d]+)/)[1]
    return (
      <a href={`${CHAMO_BASE_URL}${chamo}`} target='_blank'>{state}</a>
    )
  }
  return state
}

export {
  checkBook,
  parseLink
}
