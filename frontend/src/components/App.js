import React, { Component } from 'react';
import Nav from './Nav';
import PostsControl from './PostsControl';
import Posts from './Posts'
import PostDetails from './PostDetails'
import WritePost from './WritePost'

class App extends Component {
  render() {
    return (

      <div>
        <Nav/>

        <Posts/>

        <PostDetails/>

        <WritePost/>

      </div>
    );
  }
}

export default App;
