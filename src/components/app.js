import React from 'react';
import { Component } from 'react';
import BookList from './book-list'
import BookListInput from './book-list-input'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>HKPL Watchman</h1>
        <BookList />
        <BookListInput />
      </div>
    );
  }
}
