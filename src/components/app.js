import React from 'react';
import { Component } from 'react';
import BookList from './book-list'
import BookListInput from './book-list-input'
import GithubCorner from 'react-github-corner'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>HKPL Watchman</h1>
        <BookList />
        <BookListInput />
        <GithubCorner
          href='https://github.com/jackytck/hkpl-watchman'
          octoColor='#333'
          bannerColor='#FFF'/>
      </div>
    );
  }
}
